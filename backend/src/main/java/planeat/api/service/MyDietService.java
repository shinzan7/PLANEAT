package planeat.api.service;

/*
 *
 * MyDietService
 *
 @author 박윤하
 @since 2022-09-22
*/

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import planeat.api.dto.mydiet.MyDietRequest;
import planeat.api.dto.mydiet.MyDietResponse;
import planeat.database.entity.DietInfo;
import planeat.database.entity.FoodInfo;
import planeat.database.entity.MyDiet;
import planeat.database.entity.User;
import planeat.database.repository.DietInfoRepository;
import planeat.database.repository.FoodInfoRepository;
import planeat.database.repository.MyDietRepository;
import planeat.database.repository.UserRepository;
import planeat.exception.CustomException;
import planeat.exception.CustomExceptionList;

import javax.transaction.Transactional;
import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;

@Service
@Transactional
@RequiredArgsConstructor
public class MyDietService {

    private final MyDietRepository myDietRepository;
    private final DietInfoRepository dietInfoRepository;
    private final UserRepository userRepository;
    private final FoodInfoRepository foodInfoRepository;


    /**
     * 내 식단 등록
     *
     * @param userId        유저 번호
     * @param myDietRequest 등록할 내 식단 정보가 담긴 Dto
     * @return userId
     */
    public Long createMyDiet(Long userId, MyDietRequest myDietRequest) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new CustomException(CustomExceptionList.USER_NOT_FOUND_ERROR));
        MyDiet myDiet = MyDiet.createMyDiet(user, myDietRequest);
        Long myDietId = myDietRepository.save(myDiet).getId();

        for (int i = 0; i < myDietRequest.getDietInfosList().size(); i++) {
            DietInfo dietInfo = DietInfo.createDietInfo(getFoodInfo(myDietRequest.getDietInfosList().get(i).getFoodInfoId()), myDietRequest.getDietInfosList().get(i).getAmount(), getMyDiet(myDietId));
            dietInfoRepository.save(dietInfo);
            dietInfo.getMyDiet().getDietInfoList().add(dietInfo);
        }

        return userId;
    }


    /**
     * 내 식단 정보 조회
     *
     * @param userId 유저 번호
     * @return List<MyDietResponse>
     */
    public List<MyDietResponse> readAllMyDiets(Long userId) {
        List<MyDietResponse> myDietList = new ArrayList<>();
        List<MyDiet> myDiets = myDietRepository.findAllMyDiet(userId);

        for (MyDiet myDiet : myDiets) {
            List<MyDietResponse.DietInfos> dietInfos = new ArrayList<>();
            List<DietInfo> dietInfoList = dietInfoRepository.findByMyDietId(myDiet.getId());

            for (DietInfo dietInfo : dietInfoList) {
                FoodInfo foodInfo = dietInfo.getFoodInfo();
                BigDecimal amount = dietInfo.getAmount();
                dietInfos.add(new MyDietResponse.DietInfos(foodInfo, amount));
            }
            myDietList.add(MyDietResponse.createMyDietResponse(myDiet.getId(), myDiet.getDietName(), dietInfos));
        }
        return myDietList;
    }


    /**
     * 식단 이름으로 내 식단 조회
     *
     * @param userId   유저 번호
     * @param dietName 내 식단 이름
     * @return List<MyDietResponse>
     */
    public List<MyDietResponse> readByNameMyDiet(Long userId, String dietName) {
        List<MyDietResponse> myDietList = new ArrayList<>();
        List<MyDiet> myDiets = myDietRepository.findByUserIdAndDietName(userId, dietName);

        for (MyDiet myDiet : myDiets) {
            List<MyDietResponse.DietInfos> dietInfos = new ArrayList<>();
            List<DietInfo> dietInfoList = dietInfoRepository.findByMyDietId(myDiet.getId());

            for (DietInfo dietInfo : dietInfoList) {
                FoodInfo foodInfo = dietInfo.getFoodInfo();
                BigDecimal amount = dietInfo.getAmount();
                dietInfos.add(new MyDietResponse.DietInfos(foodInfo, amount));
            }
            myDietList.add(MyDietResponse.createMyDietResponse(myDiet.getId(), myDiet.getDietName(), dietInfos));
        }
        return myDietList;
    }


    /**
     * 내 식단 수정
     *
     * @param userId        유저 번호
     * @param myDietRequest 수정될 내 식단 정보가 담긴 DTO
     * @return userId
     */
    public Long updateMyDiet(Long userId, MyDietRequest myDietRequest) {
        Long createUser = myDietRequest.getUserId();
        if (userId.equals(createUser)) {
            User user = userRepository.findById(userId)
                    .orElseThrow(() -> new CustomException(CustomExceptionList.USER_NOT_FOUND_ERROR));
            MyDiet myDiet = MyDiet.updateMyDiet(user, myDietRequest);
            myDietRepository.save(myDiet);
            List<DietInfo> dietInfoList = dietInfoRepository.findByMyDietId(myDiet.getId());
            dietInfoRepository.deleteAll(dietInfoList);

            for (int i = 0; i < myDietRequest.getDietInfosList().size(); i++) {
                DietInfo dietInfo = DietInfo.createDietInfo(getFoodInfo(myDietRequest.getDietInfosList().get(i).getFoodInfoId()), myDietRequest.getDietInfosList().get(i).getAmount(), myDiet);
                dietInfoRepository.save(dietInfo);
            }
        }
        return userId;
    }


    /**
     * 내 식단 삭제
     *
     * @param userId        유저 번호
     * @param myDietRequest 삭제할 내 식단 정보가 담긴 DTO
     * @return userId
     */
    public Long deleteMyDiet(Long userId, MyDietRequest myDietRequest) {
        Long createUser = myDietRequest.getUserId();
        if (userId.equals(createUser)) {
            myDietRepository.delete(getMyDiet(myDietRequest.getMyDietId()));
        }
        return userId;
    }


    private MyDiet getMyDiet(Long myDietId) {
        return myDietRepository.findById(myDietId)
                .orElseThrow(() -> new CustomException(CustomExceptionList.MYDIET_NOT_FOUND_ERROR));
    }

    private FoodInfo getFoodInfo(Long foodInfoId) {
        return foodInfoRepository.findById(foodInfoId)
                .orElseThrow(() -> new CustomException(CustomExceptionList.FOODINFO_NOT_FOUND_ERROR));
    }

}
