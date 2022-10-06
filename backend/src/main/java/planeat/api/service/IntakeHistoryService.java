package planeat.api.service;

/*
 *
 * IntakeHistoryService
 *
 @author 박윤하
 @since 2022-09-25
*/

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import planeat.api.dto.intakehistory.IntakeHistoryRequest;
import planeat.api.dto.intakehistory.IntakeHistoryResponse;
import planeat.database.entity.FoodInfo;
import planeat.database.entity.IntakeFood;
import planeat.database.entity.IntakeHistory;
import planeat.database.entity.User;
import planeat.database.repository.FoodInfoRepository;
import planeat.database.repository.IntakeFoodRepository;
import planeat.database.repository.IntakeHistoryRepository;
import planeat.database.repository.UserRepository;
import planeat.exception.CustomException;
import planeat.exception.CustomExceptionList;

import javax.transaction.Transactional;
import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Service
@Transactional
@RequiredArgsConstructor
public class IntakeHistoryService {

    private final IntakeHistoryRepository intakeHistoryRepository;
    private final IntakeFoodRepository intakeFoodRepository;
    private final UserRepository userRepository;
    private final FoodInfoRepository foodInfoRepository;
    private final AnalysisHistoryService analysisHistoryService;


    /**
     * 섭취 기록 등록
     *
     * @param userId               유저 번호
     * @param intakeHistoryRequest 등록할 섭취 기록 정보가 담긴 Dto
     * @return userId
     */
    public Long createIntakeHistory(Long userId, IntakeHistoryRequest intakeHistoryRequest) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new CustomException(CustomExceptionList.USER_NOT_FOUND_ERROR));
        IntakeHistory intakeHistory = IntakeHistory.createIntakeHistory(user, intakeHistoryRequest);
        Long intakeHistoryId = intakeHistoryRepository.save(intakeHistory).getId();

        for (int i = 0; i < intakeHistoryRequest.getIntakeFoodsList().size(); i++) {
            FoodInfo foodInfo = getFoodInfo(intakeHistoryRequest.getIntakeFoodsList().get(i).getFoodInfoId());
            BigDecimal amount = intakeHistoryRequest.getIntakeFoodsList().get(i).getAmount();
            //음식정보와 섭취량을 분석기록에 반영
            analysisHistoryService.plusFoodFromAnalysisHistory(userId, intakeHistoryRequest.getDate(), foodInfo, amount);

            IntakeFood intakeFood = IntakeFood.createIntakeFood(foodInfo, amount, getIntakeHistory(intakeHistoryId));
            intakeFoodRepository.save(intakeFood);
            intakeFood.getIntakeHistory().getIntakeFoodList().add(intakeFood);
        }

        return userId;
    }


    /**
     * 날짜별 섭취 기록 정보 조회
     *
     * @param userId 유저 번호
     * @param date   조회할 날짜
     * @return List<MyDietResponse>
     */
    public List<IntakeHistoryResponse> readByDateIntakeHistory(Long userId, LocalDate date) {
        List<IntakeHistoryResponse> intakeHistoryList = new ArrayList<>();
        List<IntakeHistory> intakeHistories = intakeHistoryRepository.findAllByIdAndDateIntakeHistory(userId, date);

        for (IntakeHistory intakeHistory : intakeHistories) {
            List<IntakeHistoryResponse.IntakeFoods> intakeFoods = new ArrayList<>();
            List<IntakeFood> intakeFoodList = intakeHistory.getIntakeFoodList();

            for (IntakeFood intakeFood : intakeFoodList) {
                FoodInfo foodInfo = intakeFood.getFoodInfo();
                BigDecimal amount = intakeFood.getAmount();
                intakeFoods.add(new IntakeHistoryResponse.IntakeFoods(foodInfo, amount));
            }
            intakeHistoryList.add(IntakeHistoryResponse.createIntakeHistoryResponse(intakeHistory.getId(), intakeHistory.getMealType().toString(), intakeFoods));
        }
        return intakeHistoryList;
    }


    /**
     * 섭취 기록 수정
     *
     * @param userId               유저 번호
     * @param intakeHistoryRequest 수정할 섭취 기록 정보가 담긴 Dto
     * @return userId
     */
    public Long updateIntakeHistory(Long userId, IntakeHistoryRequest intakeHistoryRequest) {
        Long createUser = intakeHistoryRequest.getUserId();
        if (userId.equals((createUser))) {
            User user = userRepository.findById(userId)
                    .orElseThrow(() -> new CustomException(CustomExceptionList.USER_NOT_FOUND_ERROR));

            //추가 코드 유저Id, 날짜, mealType
            IntakeHistory history = intakeHistoryRepository.findByUserAndDateAndMealType(user, intakeHistoryRequest.getDate(), intakeHistoryRequest.getMealType())
                    .orElseThrow(() -> new CustomException((CustomExceptionList.INTAKEHISTORY_NOT_FOUND_ERROR)));
            List<IntakeFood> intakeFoods = intakeFoodRepository.findByIntakeHistoryId(history.getId());
            intakeHistoryRequest.setIntakeHistoryId(history.getId());

            //분석기록에서 foodInfo * amount만큼 차감
            for (IntakeFood i : intakeFoods) {
                //음식정보와 섭취량을 분석기록에 반영
                analysisHistoryService.minusFoodFromAnalysisHistory(userId, intakeHistoryRequest.getDate(), i.getFoodInfo(), i.getAmount());
            }

            IntakeHistory intakeHistory = IntakeHistory.updateIntakeHistory(user, intakeHistoryRequest);
            List<IntakeFood> intakeFoodList = intakeFoodRepository.findByIntakeHistoryId(history.getId());
            intakeFoodRepository.deleteAll(intakeFoodList);

            for (int i = 0; i < intakeHistoryRequest.getIntakeFoodsList().size(); i++) {
                IntakeFood intakeFood = IntakeFood.createIntakeFood(getFoodInfo(intakeHistoryRequest.getIntakeFoodsList().get(i).getFoodInfoId()), intakeHistoryRequest.getIntakeFoodsList().get(i).getAmount(), intakeHistory);

                //음식정보와 섭취량을 분석기록에 반영
                analysisHistoryService.plusFoodFromAnalysisHistory(userId, intakeHistoryRequest.getDate(), intakeFood.getFoodInfo(), intakeFood.getAmount());

                intakeFoodRepository.save(intakeFood);
                intakeFood.getIntakeHistory().getIntakeFoodList().add(intakeFood);
            }
        }
        return userId;
    }


    /**
     * 섭취 기록 삭제
     * *
     * * @param userId 유저 번호
     * * @return SUCCCESS, userId, HttpStatus.CREATED(200)
     *
     * @param userId               유저 번호
     * @param intakeHistoryRequest 삭제할 섭취 기록 정보가 담긴 Dto
     * @return userId
     */
    public Long deleteIntakeHistory(Long userId, IntakeHistoryRequest intakeHistoryRequest) {
        //분석기록에서 foodInfo * amount만큼 차감
        IntakeHistory intakeHistory = getIntakeHistory(intakeHistoryRequest.getIntakeHistoryId());
        List<IntakeFood> intakeFoodList = intakeFoodRepository.findByIntakeHistoryId(intakeHistory.getId());

        for (IntakeFood intakeFood : intakeFoodList) {
            FoodInfo foodInfo = intakeFood.getFoodInfo();
            BigDecimal amount = intakeFood.getAmount();

            //음식정보와 섭취량을 분석기록에 반영
            analysisHistoryService.minusFoodFromAnalysisHistory(userId, intakeHistoryRequest.getDate(), foodInfo, amount);
        }

        //기존 삭제 코드
        Long createUser = intakeHistoryRequest.getUserId();
        if (userId.equals((createUser))) {
            intakeHistoryRepository.delete(intakeHistory);
        }
        return userId;
    }


    private IntakeHistory getIntakeHistory(Long intakeHistoryId) {
        return intakeHistoryRepository.findById(intakeHistoryId)
                .orElseThrow(() -> new CustomException(CustomExceptionList.INTAKEHISTORY_NOT_FOUND_ERROR));
    }

    private FoodInfo getFoodInfo(Long foodInfoId) {
        return foodInfoRepository.findById(foodInfoId)
                .orElseThrow(() -> new CustomException(CustomExceptionList.FOODINFO_NOT_FOUND_ERROR));
    }

}
