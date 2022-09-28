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

    /**
     * 섭취 기록 등록
     *
     * @param userId 유저 번호
     * @param intakeHistoryRequest 등록할 섭취 기록 정보가 담긴 Dto
     * @return userId
     */
    public Long createIntakeHistory(Long userId, IntakeHistoryRequest intakeHistoryRequest) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new CustomException(CustomExceptionList.USER_NOT_FOUND_ERROR));
        IntakeHistory intakeHistory = IntakeHistory.createIntakeHistory(user, intakeHistoryRequest);
        Long intakeHistoryId = intakeHistoryRepository.save(intakeHistory).getId();

        for (int i = 0; i < intakeHistoryRequest.getIntakeFoodsList().size(); i++) {
            IntakeFood intakeFood = IntakeFood.createIntakeFood(getFoodInfo(intakeHistoryRequest.getIntakeFoodsList().get(i).getFoodInfoId()), intakeHistoryRequest.getIntakeFoodsList().get(i).getAmount(), getIntakeHistory(intakeHistoryId));
            intakeFoodRepository.save(intakeFood);
            intakeFood.getIntakeHistory().getIntakeFoodList().add(intakeFood);
        }

        return userId;
    }


    /**
     * 날짜별 섭취 기록 정보 조회
     *
     * @param userId 유저 번호
     * @param date 조회할 날짜
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
     * @param userId 유저 번호
     * @param intakeHistoryRequest 수정할 섭취 기록 정보가 담긴 Dto
     * @return userId
     */
    public Long updateIntakeHistory(Long userId, IntakeHistoryRequest intakeHistoryRequest) {
        Long createUser = intakeHistoryRequest.getUserId();
        if(userId.equals((createUser))) {
            User user = userRepository.findById(userId)
                    .orElseThrow(() -> new CustomException(CustomExceptionList.USER_NOT_FOUND_ERROR));
            IntakeHistory intakeHistory = IntakeHistory.updateIntakeHistory(user, intakeHistoryRequest);
            intakeHistoryRepository.save(intakeHistory);
            List<IntakeFood> intakeFoodList = intakeFoodRepository.findByIntakeHistoryId(intakeHistory.getId());
            intakeFoodRepository.deleteAll(intakeFoodList);

            for (int i = 0; i < intakeHistoryRequest.getIntakeFoodsList().size(); i++) {
                IntakeFood intakeFood = IntakeFood.createIntakeFood(getFoodInfo(intakeHistoryRequest.getIntakeFoodsList().get(i).getFoodInfoId()), intakeHistoryRequest.getIntakeFoodsList().get(i).getAmount(), intakeHistory);
                intakeFoodRepository.save(intakeFood);
            }
        }
        return userId;
    }


    /**
     * 섭취 기록 삭제
     *      *
     *      * @param userId 유저 번호
     *      * @return SUCCCESS, userId, HttpStatus.CREATED(200)
     * @param userId 유저 번호
     * @param intakeHistoryRequest 삭제할 섭취 기록 정보가 담긴 Dto
     * @return userId
     */
    public Long deleteIntakeHistory(Long userId, IntakeHistoryRequest intakeHistoryRequest) {
        Long createUser = intakeHistoryRequest.getUserId();
        if(userId.equals((createUser))) {
            intakeHistoryRepository.delete(getIntakeHistory(intakeHistoryRequest.getIntakeHistoryId()));
        }
        return userId;
    }

    private IntakeHistory getIntakeHistory(Long intakeHistoryId) {
        return intakeHistoryRepository.findById(intakeHistoryId)
                .orElseThrow(()-> new  CustomException(CustomExceptionList.INTAKEHISTORY_NOT_FOUND_ERROR));
    }

    private FoodInfo getFoodInfo(Long foodInfoId) {
        return foodInfoRepository.findById(foodInfoId)
                .orElseThrow(() -> new CustomException(CustomExceptionList.FOODINFO_NOT_FOUND_ERROR));
    }

}
