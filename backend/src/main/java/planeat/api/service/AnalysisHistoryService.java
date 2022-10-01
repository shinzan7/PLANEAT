package planeat.api.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import planeat.api.dto.analysishistory.AnalysisHistoryRequest;
import planeat.api.dto.analysishistory.AnalysisHistoryResponse;
import planeat.database.entity.AnalysisHistory;
import planeat.database.entity.User;
import planeat.database.repository.AnalysisHistoryRepository;
import planeat.database.repository.UserRepository;
import planeat.exception.CustomException;
import planeat.exception.CustomExceptionList;

import javax.transaction.Transactional;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;

@Service
@Transactional
@RequiredArgsConstructor
public class AnalysisHistoryService {
    private final AnalysisHistoryRepository analysisHistoryRepository;
    private final UserRepository userRepository;

    public AnalysisHistoryRequest createAnalysisHistory(Long userId ,AnalysisHistoryRequest request){
        User user = userRepository.findById(userId).orElseThrow(
                () -> new CustomException(CustomExceptionList.USER_NOT_FOUND_ERROR)
        );
        AnalysisHistory analysisHistory = AnalysisHistory.builder()
                .user(user)
                .date(request.getDate())
                .analysisType(1) // 실제섭취량: 1, 권장섭취량 : 2
                .analysisScore("좋음") // 점수계산??
                .calorie(request.getCalorie())
                .protein(request.getProtein())
                .fat(request.getFat())
                .carbohydrate(request.getCarbohydrate())
                .sugar(request.getSugar())
                .dietaryFiber(request.getDietary_fiber())
                .calcium(request.getCalcium())
                .iron(request.getIron())
                .magnesium(request.getMagnesium())
                .phosphorus(request.getPhosphorus())
                .potassium(request.getPotassium())
                .sodium(request.getSodium())
                .zinc(request.getZinc())
                .copper(request.getCopper())
                .manganese(request.getManganese())
                .selenium(request.getSelenium())
                .vitaminA(request.getVitaminA())
                .vitaminB1(request.getVitaminB1())
                .vitaminB2(request.getVitaminB2())
                .vitaminB6(request.getVitaminB6())
                .vitaminB12(request.getVitaminB12())
                .vitaminC(request.getVitaminC())
                .vitaminD(request.getVitaminD())
                .folate(request.getFolate())
                .cholesterol(request.getCholesterol())
                .fattyAcid(request.getFattyAcid())
                .linoleicAcid(request.getLinoleicAcid())
                .alphaLinoleicAcid(request.getAlphaLinoleicAcid())
                .transFattyAcid(request.getTransFattyAcid())
                .build();


        return request;
    }

    public List<AnalysisHistoryResponse> readAllAnalysisHistoryByDateAfter(Long userId, LocalDate date){
        User user = userRepository.findById(userId).orElseThrow(
                () -> new CustomException(CustomExceptionList.USER_NOT_FOUND_ERROR)
        );

        List<AnalysisHistory> historyList = analysisHistoryRepository.findByUserAndDateAfter(user, date);
        List<AnalysisHistoryResponse> responseList = new ArrayList<>(historyList.size());

        for (AnalysisHistory h : historyList){
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
}
