package planeat.api.service;

/*
 *
 * FoodInfoService
 *
 @author 박윤하
 @since 2022-09-19
*/

import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;
import planeat.api.dto.foodinfo.FoodInfoRequest;
import planeat.api.dto.foodinfo.FoodInfoResponse;
import planeat.database.entity.FoodInfo;
import planeat.database.repository.FoodInfoRepository;
import planeat.exception.CustomException;
import planeat.exception.CustomExceptionList;

import javax.transaction.Transactional;
import java.util.ArrayList;
import java.util.List;

@Service
@Transactional
@RequiredArgsConstructor
public class FoodInfoService {

    private final FoodInfoRepository foodInfoRepository;


    /**
     * 식품 정보 등록
     *
     * @param userId          유저 번호
     * @param foodInfoRequest 등록할 식품 정보가 담긴 Dto
     * @return userId
     */
    public Long createFoodInfo(Long userId, FoodInfoRequest foodInfoRequest) {
        FoodInfo foodInfo = FoodInfo.createFoodInfo(userId, foodInfoRequest);
        foodInfoRepository.save(foodInfo);
        return userId;
    }


    /**
     * 유저 번호로 식품 정보 조회
     *
     * @param userId 유저 번호 1:관리자
     * @return List<FoodInfoResponse>
     */
    public List<FoodInfoResponse> readFoodInfo(Long userId) {
        List<FoodInfoResponse> foodInfoList = new ArrayList<>();
        PageRequest pageRequest = PageRequest.of(0, 100);
        List<FoodInfo> foodInfos = foodInfoRepository.findByFoodUser(userId, pageRequest);
        for (FoodInfo foodInfo : foodInfos) {
            foodInfoList.add(FoodInfoResponse.createFoodInfoResponse(foodInfo));
        }
        return foodInfoList;
    }


    /**
     * 식품 이름으로 식품 정보 조회
     *
     * @param userId 유저 번호 1:관리자
     * @param name   검색 이름
     * @return List<FoodInfoResponse>
     */
    public List<FoodInfoResponse> readByNameFoodInfo(Long userId, String name) {
        List<FoodInfoResponse> foodInfoList = new ArrayList<>();
        PageRequest pageRequest = PageRequest.of(0, 500);
        List<FoodInfo> foodInfos = foodInfoRepository.findByNameAndFoodUser(name, userId, pageRequest);
        for (FoodInfo foodInfo : foodInfos) {
            foodInfoList.add(FoodInfoResponse.createFoodInfoResponse(foodInfo));
        }
        return foodInfoList;
    }


    /**
     * 식품 정보 수정
     *
     * @param userId          유저 번호
     * @param foodInfoRequest 수정될 식품 정보가 담긴 DTO
     * @return userId
     */
    public Long updateFoodInfo(Long userId, FoodInfoRequest foodInfoRequest) {
        // 음식 번호에 해당하는 유저 번호와 현재 유저 번호가 같은지 확인
        Long createUser = foodInfoRequest.getFoodUser();
        if (userId.equals(createUser)) {
            FoodInfo foodInfo = FoodInfo.updateFoodInfo(userId, foodInfoRequest);
            foodInfoRepository.save(foodInfo);
        }
        return userId;
    }


    /**
     * 식품 정보 삭제
     *
     * @param userId          유저 번호
     * @param foodInfoRequest 삭제될 식품 정보가 담긴 DTO
     * @return userId
     */
    public Long deleteFoodInfo(Long userId, FoodInfoRequest foodInfoRequest) {
        // 음식 번호에 해당하는 유저 번호와 현재 유저 번호가 같은지 확인
        Long createUser = foodInfoRequest.getFoodUser();
        if (userId.equals(createUser)) {
            foodInfoRepository.delete(getFoodInfo(foodInfoRequest.getFoodInfoId()));
        }
        return userId;
    }


    private FoodInfo getFoodInfo(Long foodInfoId) {
        return foodInfoRepository.findById(foodInfoId)
                .orElseThrow(() -> new CustomException(CustomExceptionList.FOODINFO_NOT_FOUND_ERROR));
    }

}
