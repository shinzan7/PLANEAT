package planeat.api.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import planeat.api.dto.analysishistory.AnalysisHistoryPercentResponse;
import planeat.api.dto.analysishistory.AnalysisHistoryResponse;
import planeat.database.entity.AnalysisHistory;
import planeat.database.entity.User;
import planeat.database.repository.AnalysisHistoryRepository;
import planeat.database.repository.UserRepository;
import planeat.api.dto.analysishistory.IngredientInfoDto;
import planeat.api.dto.usernutrient.NutrientHistoryRequest;
import planeat.database.entity.*;
import planeat.database.repository.*;
import planeat.exception.CustomException;
import planeat.exception.CustomExceptionList;

import javax.transaction.Transactional;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.math.BigDecimal;
import java.time.ZoneId;
import java.util.List;
import java.util.Optional;


@Service
@Transactional
@RequiredArgsConstructor
public class AnalysisHistoryService {
    private final AnalysisHistoryRepository analysisHistoryRepository;
    private final UserRepository userRepository;
    private final UserRecIntakeRepository userRecIntakeRepository;
    private final NutritionRepository nutritionRepository;
    private final NutrientRepository nutrientRepository;
    private final NutrientIngredientRespository nutrientIngredientRespository;
    private final NutrientHistoryRepository nutrientHistoryRepository;
    private final IntakeHistoryRepository intakeHistoryRepository;

    /**
     * 분석기록을 삭제하면 그날의 섭취기록, 섭취음식, 유저영양제 섭취기록을 삭제한다.
     * @param userId
     * @param date
     * @return
     */
    public Long deleteAnalysisHistory(Long userId, LocalDate date){
        List<AnalysisHistory> historyList = analysisHistoryRepository.findByUserIdAndDate(userId, date);
        Long result = 0L;
        if(historyList.size()!=0){
            result = historyList.get(0).getId();
        }
        analysisHistoryRepository.deleteAll(historyList);
        intakeHistoryRepository.deleteByUser_IdAndDate(userId, date);
        nutrientHistoryRepository.deleteByUserNutrient_User_IdAndIntakeDate(userId, date);

        return result;
    }

    public List<AnalysisHistoryResponse> getAllAnalysisHistory(Long userId) {
        User user = userRepository.findById(userId).orElseThrow(
                () -> new CustomException(CustomExceptionList.USER_NOT_FOUND_ERROR)
        );
        List<AnalysisHistory> historyList = analysisHistoryRepository.findByUserOrderByDateAsc(user);
        List<AnalysisHistoryResponse> responseList = new ArrayList<>(historyList.size());

        if (historyList.size() != 0) {
            for (AnalysisHistory h : historyList) {
                AnalysisHistoryResponse response = AnalysisHistoryResponse.builder()
                        .analysisHistoryId(h.getId())
                        .date(h.getDate().format(DateTimeFormatter.ISO_DATE))
                        .analysisType(h.getAnalysisType())
                        .analysisScore(h.getAnalysisScore())
                        .calorie(h.getCalorie())
                        .protein(h.getProtein())
                        .fat(h.getFat())
                        .carbohydrate(h.getCarbohydrate())
                        .sugar(h.getSugar())
                        .dietaryFiber(h.getDietaryFiber())
                        .calcium(h.getCalcium())
                        .iron(h.getIron())
                        .magnesium(h.getMagnesium())
                        .phosphorus(h.getPhosphorus())
                        .potassium(h.getPotassium())
                        .sodium(h.getSodium())
                        .zinc(h.getZinc())
                        .copper(h.getCopper())
                        .manganese(h.getManganese())
                        .selenium(h.getSelenium())
                        .vitaminA(h.getVitaminA())
                        .vitaminD(h.getVitaminD())
                        .vitaminB6(h.getVitaminB6())
                        .folate(h.getFolate())
                        .vitaminB12(h.getVitaminB12())
                        .vitaminC(h.getVitaminC())
                        .cholesterol(h.getCholesterol())
                        .fattyAcid(h.getFattyAcid())
                        .linoleicAcid(h.getLinoleicAcid())
                        .alphaLinoleicAcid(h.getAlphaLinoleicAcid())
                        .transFattyAcid(h.getTransFattyAcid())
                        .vitaminB1(h.getVitaminB1())
                        .vitaminB2(h.getVitaminB2())
                        .build();

                responseList.add(response);
            }
        }

        return responseList;
    }

    /**
     * 유저id와 날짜에 해당하는 엔티티 2개를 리스트로 반환한다
     * (만약 엔티티가 없으면 새로 생성한다 - 실제, 권장 2개)
     *
     * @param userId    조회할 유저id
     * @param localDate 조회할 분석기록 날짜
     * @return List[실제섭취량, 권장섭취량]
     */
    public List<AnalysisHistory> getAnalysisHistory(Long userId, LocalDate localDate) {
        User user = userRepository.findById(userId).orElseThrow(
                () -> new CustomException(CustomExceptionList.USER_NOT_FOUND_ERROR)
        );

        //유저와 날짜로 분석기록 조회
        List<AnalysisHistory> analysisHistoryList = analysisHistoryRepository.
                findByUserIdAndDate(user.getId(), localDate);

        //데이터가 없는 경우 새로 생성
        if (analysisHistoryList.size() == 0) {
            //실제 섭취량
            AnalysisHistory real = AnalysisHistory.builder()
                    .user(user)
                    .date(localDate)
                    .analysisType(0)
                    .analysisScore("나쁨")
                    .calorie(0f)
                    .carbohydrate(0f)
                    .dietaryFiber(0f)
                    .fat(0f)
                    .alphaLinoleicAcid(0f)

                    .linoleicAcid(0f)
                    .protein(0f)
                    .vitaminA(0f)
                    .vitaminD(0f)

                    .vitaminC(0f)
                    .vitaminB1(0f)
                    .vitaminB2(0f)
                    .folate(0f)
                    .vitaminB12(0f)

                    .calcium(0f)
                    .phosphorus(0f)
                    .sodium(0f)
                    .potassium(0f)
                    .magnesium(0f)

                    .iron(0f)
                    .zinc(0f)
                    .copper(0f)
                    .manganese(0f)
                    .selenium(0f)

                    .sugar(0f)
                    .vitaminB6(0f)
                    .cholesterol(0f)
                    .fattyAcid(0f)
                    .transFattyAcid(0f)
                    .build();

            //해당날짜의 유저 권장섭취량
            Optional<UserRecIntake> userRecIntake = userRecIntakeRepository.
                    findFirstByUserAndUpdateDateLessThanEqualOrderByUpdateDateDesc(user, localDate);

            //필수영양소
            int nowYear = LocalDate.now(ZoneId.of("Asia/Seoul")).getYear() + 1;
            Integer age = nowYear - user.getBirthyear();
            List<Nutrition> nList = nutritionRepository.findAllByGenderAndAge(user.getGender(), age);

            //권장 섭취량
            //유저 권장섭취량과 필수영양소의 정보를 넣는다
            int idx = 0; //nList의 수분 전까지의 인덱스
            int i = 8; //비타민A 부터의 인덱스
            AnalysisHistory recommend = AnalysisHistory.builder()
                    .user(user)
                    .date(localDate)
                    .analysisType(1)
                    .analysisScore("권장섭취량")
                    .calorie(nList.get(idx++).getIntake_rec().floatValue())
                    .carbohydrate(nList.get(idx++).getIntake_rec().floatValue())
                    .dietaryFiber(nList.get(idx++).getIntake_rec().floatValue())
                    .fat(nList.get(idx++).getIntake_rec().floatValue())
                    .alphaLinoleicAcid(nList.get(idx++).getIntake_rec().floatValue())

                    .linoleicAcid(nList.get(idx++).getIntake_rec().floatValue())
                    .protein(nList.get(idx).getIntake_rec().floatValue())
                    .vitaminA(nList.get(i++).getIntake_rec().floatValue())
                    .vitaminD(nList.get(i++).getIntake_rec().floatValue())

                    .vitaminC(nList.get(i++).getIntake_rec().floatValue())
                    .vitaminB1(nList.get(i++).getIntake_rec().floatValue())
                    .vitaminB2(nList.get(i++).getIntake_rec().floatValue())
                    .folate(nList.get(i++).getIntake_rec().floatValue())
                    .vitaminB12(nList.get(i++).getIntake_rec().floatValue())

                    .calcium(nList.get(i++).getIntake_rec().floatValue())
                    .phosphorus(nList.get(i++).getIntake_rec().floatValue())
                    .sodium(nList.get(i++).getIntake_rec().floatValue())
                    .potassium(nList.get(i++).getIntake_rec().floatValue())
                    .magnesium(nList.get(i++).getIntake_rec().floatValue())

                    .iron(nList.get(i++).getIntake_rec().floatValue())
                    .zinc(nList.get(i++).getIntake_rec().floatValue())
                    .copper(nList.get(i++).getIntake_rec().floatValue())
                    .manganese(nList.get(i++).getIntake_rec().floatValue())
                    .selenium(nList.get(i++).getIntake_rec().floatValue())

                    .sugar(50f)
                    .vitaminB6(1400f)
                    .cholesterol(300f)
                    .fattyAcid(15f)
                    .transFattyAcid(2f)
                    .build();

            if (userRecIntake.isPresent()) {
                //칼로리,탄,단,지 -> 유저 권장섭취량으로 update
                recommend.updateRecIntake(userRecIntake.get().getCalorie(),
                        userRecIntake.get().getCarbohydrate(),
                        userRecIntake.get().getProtein(),
                        userRecIntake.get().getFat());
            }

            analysisHistoryRepository.save(real);
            analysisHistoryRepository.save(recommend);

            analysisHistoryList.add(real);
            analysisHistoryList.add(recommend);
        }

        return analysisHistoryList;
    }

    public AnalysisHistoryPercentResponse makeAverageAnalysisHistoryByDate(Long userId, LocalDate date) {
        User user = userRepository.findById(userId).orElseThrow(
                () -> new CustomException(CustomExceptionList.USER_NOT_FOUND_ERROR)
        );
        AnalysisHistoryPercentResponse response = new AnalysisHistoryPercentResponse();

        List<AnalysisHistory> historyList = analysisHistoryRepository.findByUserAndDateOrderByDateAsc(user, date);
        //기록이 없으면 빈값 넘겨주기
        if (historyList.size() == 0) {
            return response;
        }

        Integer badCount = 0;
        Integer normalCount = 0;
        Integer goodCount = 0;

        float calorie = 0f;
        float protein = 0f;
        float fat = 0f;
        float carbohydrate = 0f;
        float sugar = 0f;

        float dietaryFiber = 0f;
        float calcium = 0f;
        float iron = 0f;
        float magnesium = 0f;
        float phosphorus = 0f;

        float potassium = 0f;
        float sodium = 0f;
        float zinc = 0f;
        float copper = 0f;
        float manganese = 0f;

        float selenium = 0f;
        float vitaminA = 0f;
        float vitaminD = 0f;
        float vitaminB6 = 0f;
        float folate = 0f;

        float vitaminB12 = 0f;
        float vitaminC = 0f;
        float cholesterol = 0f;
        float fattyAcid = 0f;
        float linoleicAcid = 0f;

        float alphaLinoleicAcid = 0f;
        float transFattyAcid = 0f;
        float vitaminB1 = 0f;
        float vitaminB2 = 0f;

        //변수에 비율 모두 더하기
        for (int i = 0; i < historyList.size(); i++) {
            AnalysisHistory real = historyList.get(i); //실제섭취량
            AnalysisHistory rec = historyList.get(++i); //실제섭취량

            //점수 카운트
            if (real.getAnalysisScore().equals("나쁨")) {
                badCount++;
            } else if (real.getAnalysisScore().equals("보통")) {
                normalCount++;
            } else {
                goodCount++;
            }

            calorie += Math.round(real.getCalorie() * 100 / rec.getCalorie());
            protein += Math.round(real.getProtein() * 100 / rec.getProtein());
            fat += Math.round(real.getFat() * 100 / rec.getFat());
            carbohydrate += Math.round(real.getCarbohydrate() * 100 / rec.getCarbohydrate());
            sugar += Math.round(real.getSugar() * 100 / rec.getSugar());

            dietaryFiber += Math.round(real.getDietaryFiber() * 100 / rec.getDietaryFiber());
            calcium += Math.round(real.getCalcium() * 100 / rec.getCalcium());
            iron += Math.round(real.getIron() * 100 / rec.getIron());
            magnesium += Math.round(real.getMagnesium() * 100 / rec.getMagnesium());
            phosphorus += Math.round(real.getPhosphorus() * 100 / rec.getPhosphorus());

            potassium += Math.round(real.getPotassium() * 100 / rec.getPotassium());
            sodium += Math.round(real.getSodium() * 100 / rec.getSodium());
            zinc += Math.round(real.getZinc() * 100 / rec.getZinc());
            copper += Math.round(real.getCopper() * 100 / rec.getCopper());
            manganese += Math.round(real.getManganese() * 100 / rec.getManganese());

            selenium += Math.round(real.getSelenium() * 100 / rec.getSelenium());
            vitaminA += Math.round(real.getVitaminA() * 100 / rec.getVitaminA());
            vitaminD += Math.round(real.getVitaminD() * 100 / rec.getVitaminD());
            vitaminB6 += Math.round(real.getVitaminB6() * 100 / rec.getVitaminB6());
            folate += Math.round(real.getFolate() * 100 / rec.getFolate());

            vitaminB12 += Math.round(real.getVitaminB12() * 100 / rec.getVitaminB12());
            vitaminC += Math.round(real.getVitaminC() * 100 / rec.getVitaminC());
            cholesterol += Math.round(real.getCholesterol() * 100 / rec.getCholesterol());
            fattyAcid += Math.round(real.getFattyAcid() * 100 / rec.getFattyAcid());
            linoleicAcid += Math.round(real.getLinoleicAcid() * 100 / rec.getLinoleicAcid());

            alphaLinoleicAcid += Math.round(real.getAlphaLinoleicAcid() * 100 / rec.getAlphaLinoleicAcid());
            transFattyAcid += Math.round(real.getTransFattyAcid() * 100 / rec.getTransFattyAcid());
            vitaminB1 += Math.round(real.getVitaminB1() * 100 / rec.getVitaminB1());
            vitaminB2 += Math.round(real.getVitaminB2() * 100 / rec.getVitaminB2());
        }

        response = AnalysisHistoryPercentResponse.builder()
                .analysisType(2)
                .badCount(badCount)
                .normalCount(normalCount)
                .goodCount(goodCount)
                .calorie(calorie)
                .protein(protein)
                .fat(fat)
                .carbohydrate(carbohydrate)
                .sugar(sugar)
                .dietaryFiber(dietaryFiber)
                .calcium(calcium)
                .iron(iron)
                .magnesium(magnesium)
                .phosphorus(phosphorus)
                .potassium(potassium)
                .sodium(sodium)
                .zinc(zinc)
                .copper(copper)
                .manganese(manganese)
                .selenium(selenium)
                .vitaminA(vitaminA)
                .vitaminD(vitaminD)
                .vitaminB6(vitaminB6)
                .folate(folate)
                .vitaminB12(vitaminB12)
                .vitaminC(vitaminC)
                .cholesterol(cholesterol)
                .fattyAcid(fattyAcid)
                .linoleicAcid(linoleicAcid)
                .alphaLinoleicAcid(alphaLinoleicAcid)
                .transFattyAcid(transFattyAcid)
                .vitaminB1(vitaminB1)
                .vitaminB2(vitaminB2)
                .build();

        return response;

    }


    /**
     * 지정날짜 이후의 분석기록들을 계산하여 (실섭취량/권장섭취량)비율의 평균을 구한다
     *
     * @param userId
     * @param date
     * @return
     */
    public AnalysisHistoryPercentResponse makeAverageAnalysisHistoryByDateAfter(Long userId, LocalDate date) {
        User user = userRepository.findById(userId).orElseThrow(
                () -> new CustomException(CustomExceptionList.USER_NOT_FOUND_ERROR)
        );
        AnalysisHistoryPercentResponse response = new AnalysisHistoryPercentResponse();

        List<AnalysisHistory> historyList = analysisHistoryRepository.findByUserAndDateAfterOrderByDateAsc(user, date);
        //기록이 없으면 빈값 넘겨주기
        if (historyList.size() == 0) {
            return response;
        }

        Integer badCount = 0;
        Integer normalCount = 0;
        Integer goodCount = 0;

        float calorie = 0f;
        float protein = 0f;
        float fat = 0f;
        float carbohydrate = 0f;
        float sugar = 0f;

        float dietaryFiber = 0f;
        float calcium = 0f;
        float iron = 0f;
        float magnesium = 0f;
        float phosphorus = 0f;

        float potassium = 0f;
        float sodium = 0f;
        float zinc = 0f;
        float copper = 0f;
        float manganese = 0f;

        float selenium = 0f;
        float vitaminA = 0f;
        float vitaminD = 0f;
        float vitaminB6 = 0f;
        float folate = 0f;

        float vitaminB12 = 0f;
        float vitaminC = 0f;
        float cholesterol = 0f;
        float fattyAcid = 0f;
        float linoleicAcid = 0f;

        float alphaLinoleicAcid = 0f;
        float transFattyAcid = 0f;
        float vitaminB1 = 0f;
        float vitaminB2 = 0f;

        //변수에 비율 모두 더하기
        for (int i = 0; i < historyList.size(); i++) {
            AnalysisHistory real = historyList.get(i); //실제섭취량
            AnalysisHistory rec = historyList.get(++i); //실제섭취량

            //점수 카운트
            if (real.getAnalysisScore().equals("나쁨")) {
                badCount++;
            } else if (real.getAnalysisScore().equals("보통")) {
                normalCount++;
            } else {
                goodCount++;
            }

            calorie += real.getCalorie() / rec.getCalorie();
            protein += real.getProtein() / rec.getProtein();
            fat += real.getFat() / rec.getFat();
            carbohydrate += real.getCarbohydrate() / rec.getCarbohydrate();
            sugar += real.getSugar() / rec.getSugar();

            dietaryFiber += real.getDietaryFiber() / rec.getDietaryFiber();
            calcium += real.getCalcium() / rec.getCalcium();
            iron += real.getIron() / rec.getIron();
            magnesium += real.getMagnesium() / rec.getMagnesium();
            phosphorus += real.getPhosphorus() / rec.getPhosphorus();

            potassium += real.getPotassium() / rec.getPotassium();
            sodium += real.getSodium() / rec.getSodium();
            zinc += real.getZinc() / rec.getZinc();
            copper += real.getCopper() / rec.getCopper();
            manganese += real.getManganese() / rec.getManganese();

            selenium += real.getSelenium() / rec.getSelenium();
            vitaminA += real.getVitaminA() / rec.getVitaminA();
            vitaminD += real.getVitaminD() / rec.getVitaminD();
            vitaminB6 += real.getVitaminB6() / rec.getVitaminB6();
            folate += real.getFolate() / rec.getFolate();

            vitaminB12 += real.getVitaminB12() / rec.getVitaminB12();
            vitaminC += real.getVitaminC() / rec.getVitaminC();
            cholesterol += real.getCholesterol() / rec.getCholesterol();
            fattyAcid += real.getFattyAcid() / rec.getFattyAcid();
            linoleicAcid += real.getLinoleicAcid() / rec.getLinoleicAcid();

            alphaLinoleicAcid += real.getAlphaLinoleicAcid() / rec.getAlphaLinoleicAcid();
            transFattyAcid += real.getTransFattyAcid() / rec.getTransFattyAcid();
            vitaminB1 += real.getVitaminB1() / rec.getVitaminB1();
            vitaminB2 += real.getVitaminB2() / rec.getVitaminB2();
        }

        float size = historyList.size() / 2;

        calorie = changePercent(calorie, size);
        protein = changePercent(protein , size);
        fat = changePercent(fat , size);
        carbohydrate = changePercent(carbohydrate , size);
        sugar = changePercent(sugar , size);

        dietaryFiber = changePercent(dietaryFiber , size);
        calcium = changePercent(calcium , size);
        iron = changePercent(iron , size);
        magnesium = changePercent(magnesium , size);
        phosphorus = changePercent(phosphorus , size);

        potassium = changePercent(potassium , size);
        sodium = changePercent(sodium , size);
        zinc = changePercent(zinc , size);
        copper = changePercent(copper , size);
        manganese = changePercent(manganese , size);

        selenium = changePercent(selenium , size);
        vitaminA = changePercent(vitaminA , size);
        vitaminD = changePercent(vitaminD , size);
        vitaminB6 = changePercent(vitaminB6 , size);
        folate = changePercent(folate , size);

        vitaminB12 = changePercent(vitaminB12 , size);
        vitaminC = changePercent(vitaminC , size);
        cholesterol = changePercent(cholesterol , size);
        fattyAcid = changePercent(fattyAcid , size);
        linoleicAcid = changePercent(linoleicAcid , size);

        alphaLinoleicAcid = changePercent(alphaLinoleicAcid , size);
        transFattyAcid = changePercent(transFattyAcid , size);
        vitaminB1 = changePercent(vitaminB1 , size);
        vitaminB2 = changePercent(vitaminB2 , size);


        response = AnalysisHistoryPercentResponse.builder()
                .analysisType(2)
                .badCount(badCount)
                .normalCount(normalCount)
                .goodCount(goodCount)
                .calorie(calorie)
                .protein(protein)
                .fat(fat)
                .carbohydrate(carbohydrate)
                .sugar(sugar)
                .dietaryFiber(dietaryFiber)
                .calcium(calcium)
                .iron(iron)
                .magnesium(magnesium)
                .phosphorus(phosphorus)
                .potassium(potassium)
                .sodium(sodium)
                .zinc(zinc)
                .copper(copper)
                .manganese(manganese)
                .selenium(selenium)
                .vitaminA(vitaminA)
                .vitaminD(vitaminD)
                .vitaminB6(vitaminB6)
                .folate(folate)
                .vitaminB12(vitaminB12)
                .vitaminC(vitaminC)
                .cholesterol(cholesterol)
                .fattyAcid(fattyAcid)
                .linoleicAcid(linoleicAcid)
                .alphaLinoleicAcid(alphaLinoleicAcid)
                .transFattyAcid(transFattyAcid)
                .vitaminB1(vitaminB1)
                .vitaminB2(vitaminB2)
                .build();

        return response;

    }

    private float changePercent(float nut, float size){
        return Math.round(nut / size * 100);
    }

    public List<AnalysisHistoryResponse> readAllAnalysisHistoryByDateAfter(Long userId, LocalDate date) {
        User user = userRepository.findById(userId).orElseThrow(
                () -> new CustomException(CustomExceptionList.USER_NOT_FOUND_ERROR)
        );

        List<AnalysisHistory> historyList = analysisHistoryRepository.findByUserAndDateAfterOrderByDateAsc(user, date);
        List<AnalysisHistoryResponse> responseList = new ArrayList<>(historyList.size());

        for (AnalysisHistory h : historyList) {
            AnalysisHistoryResponse response = AnalysisHistoryResponse.builder()
                    .analysisHistoryId(h.getId())
                    .date(h.getDate().format(DateTimeFormatter.ISO_DATE))
                    .analysisType(h.getAnalysisType())
                    .analysisScore(h.getAnalysisScore())
                    .calorie(h.getCalorie())
                    .protein(h.getProtein())
                    .fat(h.getFat())
                    .carbohydrate(h.getCarbohydrate())
                    .sugar(h.getSugar())
                    .dietaryFiber(h.getDietaryFiber())
                    .calcium(h.getCalcium())
                    .iron(h.getIron())
                    .magnesium(h.getMagnesium())
                    .phosphorus(h.getPhosphorus())
                    .potassium(h.getPotassium())
                    .sodium(h.getSodium())
                    .zinc(h.getZinc())
                    .copper(h.getCopper())
                    .manganese(h.getManganese())
                    .selenium(h.getSelenium())
                    .vitaminA(h.getVitaminA())
                    .vitaminD(h.getVitaminD())
                    .vitaminB6(h.getVitaminB6())
                    .folate(h.getFolate())
                    .vitaminB12(h.getVitaminB12())
                    .vitaminC(h.getVitaminC())
                    .cholesterol(h.getCholesterol())
                    .fattyAcid(h.getFattyAcid())
                    .linoleicAcid(h.getLinoleicAcid())
                    .alphaLinoleicAcid(h.getAlphaLinoleicAcid())
                    .transFattyAcid(h.getTransFattyAcid())
                    .vitaminB1(h.getVitaminB1())
                    .vitaminB2(h.getVitaminB2())
                    .build();
            responseList.add(response);
        }

        return responseList;

    }

    public List<AnalysisHistoryResponse> readFirstAnalysisHistoryByDate(Long userId, LocalDate date) {
        User user = userRepository.findById(userId).orElseThrow(
                () -> new CustomException(CustomExceptionList.USER_NOT_FOUND_ERROR)
        );

        List<AnalysisHistory> historyList = analysisHistoryRepository.findByUserAndDateOrderByDateAsc(user, date);
        List<AnalysisHistoryResponse> responseList = new ArrayList<>(historyList.size());

        for (AnalysisHistory h : historyList) {
            AnalysisHistoryResponse response = AnalysisHistoryResponse.builder()
                    .analysisHistoryId(h.getId())
                    .date(h.getDate().format(DateTimeFormatter.ISO_DATE))
                    .analysisType(h.getAnalysisType())
                    .analysisScore(h.getAnalysisScore())
                    .calorie(h.getCalorie())
                    .protein(h.getProtein())
                    .fat(h.getFat())
                    .carbohydrate(h.getCarbohydrate())
                    .sugar(h.getSugar())
                    .dietaryFiber(h.getDietaryFiber())
                    .calcium(h.getCalcium())
                    .iron(h.getIron())
                    .magnesium(h.getMagnesium())
                    .phosphorus(h.getPhosphorus())
                    .potassium(h.getPotassium())
                    .sodium(h.getSodium())
                    .zinc(h.getZinc())
                    .copper(h.getCopper())
                    .manganese(h.getManganese())
                    .selenium(h.getSelenium())
                    .vitaminA(h.getVitaminA())
                    .vitaminD(h.getVitaminD())
                    .vitaminB6(h.getVitaminB6())
                    .folate(h.getFolate())
                    .vitaminB12(h.getVitaminB12())
                    .vitaminC(h.getVitaminC())
                    .cholesterol(h.getCholesterol())
                    .fattyAcid(h.getFattyAcid())
                    .linoleicAcid(h.getLinoleicAcid())
                    .alphaLinoleicAcid(h.getAlphaLinoleicAcid())
                    .transFattyAcid(h.getTransFattyAcid())
                    .vitaminB1(h.getVitaminB1())
                    .vitaminB2(h.getVitaminB2())
                    .build();
            responseList.add(response);
        }

        return responseList;
    }

    /**
     * 분석기록의 영양 데이터들을 계산하여 analysis score를 계산한다
     *
     * @param real 실제섭취량 분석기록 entity
     * @param rec  권장섭취량 분석기록 entity
     * @return
     */
    public float calculateScore(AnalysisHistory real, AnalysisHistory rec) {
        int total = 0;
        total += nutritionScore(real.getCalorie(), rec.getCalorie());
        total += nutritionScore(real.getCarbohydrate(), rec.getCarbohydrate());
        total += nutritionScore(real.getDietaryFiber(), rec.getDietaryFiber());
        total += nutritionScore(real.getFat(), rec.getFat());
        total += vitaminScore(real.getAlphaLinoleicAcid(), rec.getAlphaLinoleicAcid());

        total += vitaminScore(real.getLinoleicAcid(), rec.getLinoleicAcid());
        total += nutritionScore(real.getProtein(), rec.getProtein());
        total += vitaminScore(real.getVitaminA(), rec.getVitaminA());
        total += vitaminScore(real.getVitaminD(), rec.getVitaminD());

        total += vitaminScore(real.getVitaminC(), rec.getVitaminC());
        total += vitaminScore(real.getVitaminB1(), rec.getVitaminB1());
        total += vitaminScore(real.getVitaminB2(), rec.getVitaminB2());
        total += vitaminScore(real.getFolate(), rec.getFolate());
        total += vitaminScore(real.getVitaminB12(), rec.getVitaminB12());

        total += vitaminScore(real.getCalcium(), rec.getCalcium());
        total += vitaminScore(real.getPhosphorus(), rec.getPhosphorus());
        total += vitaminScore(real.getSodium(), rec.getSodium());
        total += vitaminScore(real.getPotassium(), rec.getPotassium());
        total += vitaminScore(real.getMagnesium(), rec.getMagnesium());

        total += vitaminScore(real.getIron(), rec.getIron());
        total += vitaminScore(real.getZinc(), rec.getZinc());
        total += vitaminScore(real.getCopper(), rec.getCopper());
        total += vitaminScore(real.getManganese(), rec.getManganese());
        total += vitaminScore(real.getSelenium(), rec.getSelenium());

        total += sugarFatScore(real.getSugar(), rec.getSugar());
        total += sugarFatScore(real.getCholesterol(), rec.getCholesterol());
        total += sugarFatScore(real.getFattyAcid(), rec.getFattyAcid());
        total += sugarFatScore(real.getTransFattyAcid(), rec.getTransFattyAcid());

        float score = (float) ((total * 1.0) / 28);

        return score;
    }

    /**
     * 칼로리, 탄수화물, 단백질, 지방, 당류, 포화지방, 트랜스지방의 점수를 계산하여 반환한다.
     * 권장섭취량의 +-30% 범위는 green, +-60% 범위는 yellow, 그외는 red
     *
     * @param real 실체섭취 영양소 함량
     * @param rec  권장섭취 영양소 함량
     * @return 점수 (green:10, yellow:5, red:0)
     */
    public int nutritionScore(float real, float rec) {
        int colorScore = 0;
        float percent = real / rec;
        if (percent >= 0.7f && percent <= 1.3f) {
            colorScore = 10;
        } else if (percent >= 0.4f && percent <= 1.6f) {
            colorScore = 5;
        }

        return colorScore;
    }

    /**
     * 비타민, 무기질의 점수를 계산하여 반환한다.
     * 권장섭취량의 60% 이상은 green, 30~60% yellow, 0~30% red
     *
     * @param real 실체섭취 영양소 함량
     * @param rec  권장섭취 영양소 함량
     * @return 점수 (green:10, yellow:5, red:0)
     */
    public int vitaminScore(float real, float rec) {
        int colorScore = 0;
        float percent = real / rec;
        if (percent >= 0.6f) {
            colorScore = 10;
        } else if (percent >= 0.3f && percent <= 0.6f) {
            colorScore = 5;
        }

        return colorScore;
    }

    /**
     * 당류, 콜레스테롤, 포화지방산, 트랜스지방산 점수를 계산하여 반환한다.
     * 적정량 100% 이하는 green, 100 ~ 200% yellow, 200% 초과는 red
     *
     * @param real 실체섭취 영양소 함량
     * @param rec  권장섭취 영양소 함량
     * @return 점수 (green:10, yellow:5, red:0)
     */
    public int sugarFatScore(float real, float rec) {
        int colorScore = 0;
        float percent = real / rec;
        if (percent <= 1f) {
            colorScore = 10;
        } else if (percent > 1f && percent <= 2f) {
            colorScore = 5;
        }
        return colorScore;
    }

    /**
     * 섭취음식이 등록되면 섭취기록의 날짜에 해당하는 유저의 분석기록에 더한다
     *
     * @param userId
     * @param localDate
     * @param foodInfo
     * @param amount
     */
    public void plusFoodFromAnalysisHistory(Long userId, LocalDate localDate, FoodInfo foodInfo, BigDecimal amount) {
        List<AnalysisHistory> historyList = getAnalysisHistory(userId, localDate);
        AnalysisHistory realHistory = historyList.get(0);
        AnalysisHistory rec = historyList.get(1);
        float multi = amount.floatValue();

        realHistory.updateRecIntake(
                realHistory.getCalorie() + foodInfo.getCalorie() * multi,
                realHistory.getCarbohydrate() + foodInfo.getCarbohydrate() * multi,
                realHistory.getProtein() + foodInfo.getProtein() * multi,
                realHistory.getFat() + foodInfo.getFat() * multi
        );
        realHistory.updateSugarFat(
                realHistory.getSugar() + foodInfo.getSugar() * multi,
                realHistory.getCholesterol() + foodInfo.getCholesterol() * multi,
                realHistory.getFattyAcid() + foodInfo.getFattyAcid() * multi,
                realHistory.getTransFattyAcid() + foodInfo.getTransFattyAcid() * multi
        );
        realHistory.updateVitamin(
                realHistory.getDietaryFiber() + foodInfo.getDietary_fiber() * multi,
                realHistory.getCalcium() + foodInfo.getCalcium() * multi,
                realHistory.getIron() + foodInfo.getIron() * multi,
                realHistory.getMagnesium() + foodInfo.getMagnesium() * multi,
                realHistory.getPhosphorus() + foodInfo.getPhosphorus() * multi,
                realHistory.getPotassium() + foodInfo.getPotassium() * multi,
                realHistory.getSodium() + foodInfo.getSodium() * multi,
                realHistory.getZinc() + foodInfo.getZinc() * multi,
                realHistory.getCopper() + foodInfo.getCopper() * multi,
                realHistory.getManganese() + foodInfo.getManganese() * multi,
                realHistory.getSelenium() + foodInfo.getSelenium() * multi,
                realHistory.getVitaminA() + foodInfo.getVitaminA() * multi,
                realHistory.getVitaminD() + foodInfo.getVitaminD() * multi,
                realHistory.getFolate() + foodInfo.getFolate() * multi,
                realHistory.getVitaminB12() + foodInfo.getVitaminB12() * multi,
                realHistory.getVitaminC() + foodInfo.getVitaminC() * multi,
                realHistory.getLinoleicAcid() + foodInfo.getLinoleicAcid() * multi,
                realHistory.getAlphaLinoleicAcid() + foodInfo.getAlphaLinoleicAcid() * multi,
                realHistory.getVitaminB1() + foodInfo.getVitaminB1() * multi,
                realHistory.getVitaminB2() + foodInfo.getVitaminB2() * multi
        );
        //음식 추가 후 점수계산하여 update
        float score = calculateScore(realHistory, rec);
        String scoreString = "나쁨";
        if (score >= 6) {
            scoreString = "좋음";
        } else if (score >= 3) {
            scoreString = "보통";
        }
        realHistory.updateScore(scoreString);
    }

    /**
     * 섭취음식이 삭제되거나 수정될 때 섭취기록의 날짜에 해당하는 유저의 분석기록에서 뺀다
     *
     * @param userId
     * @param localDate
     * @param foodInfo
     * @param amount
     */
    public void minusFoodFromAnalysisHistory(Long userId, LocalDate localDate, FoodInfo foodInfo, BigDecimal amount) {
        List<AnalysisHistory> historyList = getAnalysisHistory(userId, localDate);
        AnalysisHistory realHistory = historyList.get(0);
        AnalysisHistory rec = historyList.get(1);
        float multi = amount.floatValue();

        realHistory.updateRecIntake(
                realHistory.getCalorie() - foodInfo.getCalorie() * multi,
                realHistory.getCarbohydrate() - foodInfo.getCarbohydrate() * multi,
                realHistory.getProtein() - foodInfo.getProtein() * multi,
                realHistory.getFat() - foodInfo.getFat() * multi
        );
        realHistory.updateSugarFat(
                realHistory.getSugar() - foodInfo.getSugar() * multi,
                realHistory.getCholesterol() - foodInfo.getCholesterol() * multi,
                realHistory.getFattyAcid() - foodInfo.getFattyAcid() * multi,
                realHistory.getTransFattyAcid() - foodInfo.getTransFattyAcid() * multi
        );
        realHistory.updateVitamin(
                realHistory.getDietaryFiber() - foodInfo.getDietary_fiber() * multi,
                realHistory.getCalcium() - foodInfo.getCalcium() * multi,
                realHistory.getIron() - foodInfo.getIron() * multi,
                realHistory.getMagnesium() - foodInfo.getMagnesium() * multi,
                realHistory.getPhosphorus() - foodInfo.getPhosphorus() * multi,
                realHistory.getPotassium() - foodInfo.getPotassium() * multi,
                realHistory.getSodium() - foodInfo.getSodium() * multi,
                realHistory.getZinc() - foodInfo.getZinc() * multi,
                realHistory.getCopper() - foodInfo.getCopper() * multi,
                realHistory.getManganese() - foodInfo.getManganese() * multi,
                realHistory.getSelenium() - foodInfo.getSelenium() * multi,
                realHistory.getVitaminA() - foodInfo.getVitaminA() * multi,
                realHistory.getVitaminD() - foodInfo.getVitaminD() * multi,
                realHistory.getFolate() - foodInfo.getFolate() * multi,
                realHistory.getVitaminB12() - foodInfo.getVitaminB12() * multi,
                realHistory.getVitaminC() - foodInfo.getVitaminC() * multi,
                realHistory.getLinoleicAcid() - foodInfo.getLinoleicAcid() * multi,
                realHistory.getAlphaLinoleicAcid() - foodInfo.getAlphaLinoleicAcid() * multi,
                realHistory.getVitaminB1() - foodInfo.getVitaminB1() * multi,
                realHistory.getVitaminB2() - foodInfo.getVitaminB2() * multi
        );
        //음식 추가 후 점수계산하여 update
        float score = calculateScore(realHistory, rec);
        String scoreString = "나쁨";
        if (score >= 6) {
            scoreString = "좋음";
        } else if (score >= 3) {
            scoreString = "보통";
        }
        realHistory.updateScore(scoreString);
    }

    /**
     * 영양제 섭취기록이 등록되면 섭취날짜에 해당하는 유저의 분석기록에 더한다
     *
     * @param userId
     * @param request 유저영양제id, 섭취날짜, 실제섭취횟수가 담긴 DTO
     */
    public void addUserNutrientFromAnalysisHistory(Long userId, NutrientHistoryRequest request) {
        List<AnalysisHistory> historyList = getAnalysisHistory(userId, request.getIntakeDate());
        AnalysisHistory realHistory = historyList.get(0);
        AnalysisHistory rec = historyList.get(1);
        Nutrient nutrient = nutrientRepository.findNutrientByUserNutrientId(request.getUserNutrientId());
        List<NutrientIngredient> nutrientIngredientList = nutrientIngredientRespository.findAllByNutrientId(nutrient.getId());

        //영양성분들을 합친 정보가 담긴 dto
        IngredientInfoDto infoDto = new IngredientInfoDto();

        //영양제에 담긴 영양제 성분마다 dto에 함량만큼 더한다
        for (NutrientIngredient n : nutrientIngredientList) {
            Integer ingredientId = n.getIngredient().getId();
            infoDto.addIngredient(ingredientId, n.getIngredientAmount(), request.getIntakeReal());
        }

        realHistory.updateRecIntake(
                realHistory.getCalorie() + infoDto.getCalorie(),
                realHistory.getCarbohydrate() + infoDto.getCarbohydrate(),
                realHistory.getProtein() + infoDto.getProtein(),
                realHistory.getFat() + infoDto.getFat()
        );
        realHistory.updateSugarFat(
                realHistory.getSugar() + infoDto.getSugar(),
                realHistory.getCholesterol() + infoDto.getCholesterol(),
                realHistory.getFattyAcid() + infoDto.getFattyAcid(),
                realHistory.getTransFattyAcid() + infoDto.getFattyAcid()
        );
        realHistory.updateVitamin(
                realHistory.getDietaryFiber() + infoDto.getDietaryFiber(),
                realHistory.getCalcium() + infoDto.getCalcium(),
                realHistory.getIron() + infoDto.getIron(),
                realHistory.getMagnesium() + infoDto.getMagnesium(),
                realHistory.getPhosphorus() + infoDto.getPhosphorus(),
                realHistory.getPotassium() + infoDto.getPotassium(),
                realHistory.getSodium() + infoDto.getSodium(),
                realHistory.getZinc() + infoDto.getZinc(),
                realHistory.getCopper() + infoDto.getCopper(),
                realHistory.getManganese() + infoDto.getManganese(),
                realHistory.getSelenium() + infoDto.getSelenium(),
                realHistory.getVitaminA() + infoDto.getVitaminA(),
                realHistory.getVitaminD() + infoDto.getVitaminD(),
                realHistory.getFolate() + infoDto.getFolate(),
                realHistory.getVitaminB12() + infoDto.getVitaminB12(),
                realHistory.getVitaminC() + infoDto.getVitaminC(),
                realHistory.getLinoleicAcid() + infoDto.getLinoleicAcid(),
                realHistory.getAlphaLinoleicAcid() + infoDto.getAlphaLinoleicAcid(),
                realHistory.getVitaminB1() + infoDto.getVitaminB1(),
                realHistory.getVitaminB2() + infoDto.getVitaminB2()
        );
        //음식 추가 후 점수계산하여 update
        float score = calculateScore(realHistory, rec);
        String scoreString = "나쁨";
        if (score >= 6) {
            scoreString = "좋음";
        } else if (score >= 3) {
            scoreString = "보통";
        }
        realHistory.updateScore(scoreString);
    }

    /**
     * 영양제 섭취기록이 수정되거나 삭제되면 섭취날짜에 해당하는 유저의 분석기록에서 뺀다
     *
     * @param userId
     * @param request 유저영양제id, 섭취날짜, 실제섭취횟수가 담긴 DTO
     */
    public void minusUserNutrientFromAnalysisHistory(Long userId, NutrientHistoryRequest request) {
        List<AnalysisHistory> historyList = getAnalysisHistory(userId, request.getIntakeDate());
        AnalysisHistory realHistory = historyList.get(0);
        AnalysisHistory rec = historyList.get(1);
        Nutrient nutrient = nutrientRepository.findNutrientByUserNutrientId(request.getUserNutrientId());
        List<NutrientIngredient> nutrientIngredientList = nutrientIngredientRespository.findAllByNutrientId(nutrient.getId());

        //영양성분들을 합친 정보가 담긴 dto
        IngredientInfoDto infoDto = new IngredientInfoDto();

        //영양제에 담긴 영양제 성분마다 dto에 함량만큼 더한다
        for (NutrientIngredient n : nutrientIngredientList) {
            Integer ingredientId = n.getIngredient().getId();
            infoDto.addIngredient(ingredientId, n.getIngredientAmount(), request.getIntakeReal());
        }

        realHistory.updateRecIntake(
                realHistory.getCalorie() - infoDto.getCalorie(),
                realHistory.getCarbohydrate() - infoDto.getCarbohydrate(),
                realHistory.getProtein() - infoDto.getProtein(),
                realHistory.getFat() - infoDto.getFat()
        );
        realHistory.updateSugarFat(
                realHistory.getSugar() - infoDto.getSugar(),
                realHistory.getCholesterol() - infoDto.getCholesterol(),
                realHistory.getFattyAcid() - infoDto.getFattyAcid(),
                realHistory.getTransFattyAcid() - infoDto.getFattyAcid()
        );
        realHistory.updateVitamin(
                realHistory.getDietaryFiber() - infoDto.getDietaryFiber(),
                realHistory.getCalcium() - infoDto.getCalcium(),
                realHistory.getIron() - infoDto.getIron(),
                realHistory.getMagnesium() - infoDto.getMagnesium(),
                realHistory.getPhosphorus() - infoDto.getPhosphorus(),
                realHistory.getPotassium() - infoDto.getPotassium(),
                realHistory.getSodium() - infoDto.getSodium(),
                realHistory.getZinc() - infoDto.getZinc(),
                realHistory.getCopper() - infoDto.getCopper(),
                realHistory.getManganese() - infoDto.getManganese(),
                realHistory.getSelenium() - infoDto.getSelenium(),
                realHistory.getVitaminA() - infoDto.getVitaminA(),
                realHistory.getVitaminD() - infoDto.getVitaminD(),
                realHistory.getFolate() - infoDto.getFolate(),
                realHistory.getVitaminB12() - infoDto.getVitaminB12(),
                realHistory.getVitaminC() - infoDto.getVitaminC(),
                realHistory.getLinoleicAcid() - infoDto.getLinoleicAcid(),
                realHistory.getAlphaLinoleicAcid() - infoDto.getAlphaLinoleicAcid(),
                realHistory.getVitaminB1() - infoDto.getVitaminB1(),
                realHistory.getVitaminB2() - infoDto.getVitaminB2()
        );
        //음식 추가 후 점수계산하여 update
        float score = calculateScore(realHistory, rec);
        String scoreString = "나쁨";
        if (score >= 6) {
            scoreString = "좋음";
        } else if (score >= 3) {
            scoreString = "보통";
        }
        realHistory.updateScore(scoreString);
    }
}
