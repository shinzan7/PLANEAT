package planeat.api.service;

/*
 *
 * UserService
 *
 @author 박윤하
 @since 2022-09-26
*/

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import planeat.api.dto.user.UserInfoRequest;
import planeat.api.dto.user.UserInfoResponse;
import planeat.api.dto.user.UserRecIntakeResponse;
import planeat.database.entity.*;
import planeat.database.repository.*;
import planeat.exception.CustomException;
import planeat.exception.CustomExceptionList;

import javax.transaction.Transactional;
import java.time.LocalDate;
import java.time.ZoneId;
import java.util.ArrayList;
import java.util.List;

@Service
@Transactional
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;
    private final NutritionRepository nutritionRepository;
    private final UserRecIntakeRepository userRecIntakeRepository;
    private final UserCategoryRepository userCategoryRepository;
    private final UserCategoryInfoRepository userCategoryInfoRepository;


    /**
     * 유저 정보, 유저 권장 섭취량, 카테고리 등록
     *
     * @param userId 유저 번호
     * @param userInfoRequest 유저 정보가 담긴 Dto
     * @return userId
     */
    public Long createUserInfo(Long userId, UserInfoRequest userInfoRequest) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new CustomException(CustomExceptionList.USER_NOT_FOUND_ERROR));
        User updateUser = User.updateUser(user.getId(), userInfoRequest);
        updateUser.setRefreshToken(user.getRefreshToken());
        userRepository.save(updateUser);
        UserRecIntake userRecIntake = UserRecIntake.createUserRecIntake(user, userInfoRequest);
        userRecIntakeRepository.save(userRecIntake);
//        if(userInfoRequest.getRecInfo().getUserRecIntakeId() != null) {
//            UserRecIntake.updateUserRecIntake(user, userInfoRequest);
//            userRecIntakeRepository.save(userRecIntake);
//        } else {
//            UserRecIntake userRecIntake = UserRecIntake.createUserRecIntake(user, userInfoRequest);
//            userRecIntakeRepository.save(userRecIntake);
//        }

        for (int i = 0; i < userInfoRequest.getCategoriesList().size(); i++) {
            UserCategoryInfo userCategoryInfo = getUserCategoryInfo(userInfoRequest.getCategoriesList().get(i).getUserCategoryInfoId());
            UserCategory userCategory = UserCategory.createUserCategory(user, userCategoryInfo);
            userCategoryRepository.save(userCategory);
            userCategory.getUser().getUserCategoryList().add(userCategory);
            userCategory.getUserCategoryInfo().getUserCategoryList().add(userCategory);
        }

        return userId;
    }


    /**
     * 유저, 유저 권장 섭취량, 카테고리 조회
     *
     * @param userId 유저 번호
     * @param date 조회할 날짜
     * @return UserInfoResponse
     */
    public UserInfoResponse readInfoByUserId(Long userId, LocalDate date) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new CustomException(CustomExceptionList.USER_NOT_FOUND_ERROR));
        UserRecIntake userRecIntake = userRecIntakeRepository.findByUserIdAndDate(userId, date)
                .orElseThrow(() -> new CustomException(CustomExceptionList.USER_REC_INTAKE_NOT_FOUND_ERROR));
        Integer nowYear = LocalDate.now(ZoneId.of("Asia/Seoul")).getYear() + 1;
        List<Nutrition> nutritionList = nutritionRepository.findAllByGenderAndAge(user.getGender(), nowYear - user.getBirthyear());

        List<UserCategory> userCategoryList = userCategoryRepository.findAllByUserId(userId);
        List<String> categoriesList = new ArrayList<>();
        for (UserCategory userCategory : userCategoryList) {
            categoriesList.add(userCategory.getUserCategoryInfo().getUserCategoryName());
        }

        return new UserInfoResponse(user, userRecIntake, nutritionList, categoriesList);
    }

    /**
     * 유저 카테고리 목록만 조회
     *
     * @param userId 유저 번호
     * @return List<String>
     */
    public List<String> readCategoriesByUserId(Long userId) {
        User user = getUser(userId);

        List<UserCategory> userCategoryList = userCategoryRepository.findAllByUserId(user.getId());
        List<String> categoriesList = new ArrayList<>();
        for (UserCategory userCategory : userCategoryList) {
            categoriesList.add(userCategory.getUserCategoryInfo().getUserCategoryName());
        }

        return categoriesList;
    }

    /**
     * 유저 권장 섭취량 조회
     *
     * @param userId 유저 번호
     * @param date 조회할 날짜
     * @return UserRecIntakeResponse
     */
    public UserRecIntakeResponse readRecIntakesByUserIdAndDate(Long userId, LocalDate date) {
        User user = getUser(userId);
        UserRecIntake userRecIntake = userRecIntakeRepository.findByUserIdAndDate(userId, date)
                .orElseThrow(() -> new CustomException(CustomExceptionList.USER_REC_INTAKE_NOT_FOUND_ERROR));
        Integer nowYear = LocalDate.now(ZoneId.of("Asia/Seoul")).getYear() + 1;
        List<Nutrition> nutritionList = nutritionRepository.findAllByGenderAndAge(user.getGender(), nowYear - user.getBirthyear());
        System.out.println(nutritionList);
        return new UserRecIntakeResponse(userRecIntake, nutritionList);
    }


    /**
     * 유저, 유저 권장 섭취량, 카테고리 수정
     *
     * @param userId 유저 번호
     * @param userInfoRequest 수정할 유저 정보가 담긴 Dto
     * @return userId
     */
    public Long updateUserInfo(Long userId, UserInfoRequest userInfoRequest) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new CustomException(CustomExceptionList.USER_NOT_FOUND_ERROR));
        User.updateUser(user.getId(), userInfoRequest);
        User updateUser = User.updateUser(user.getId(), userInfoRequest);
        updateUser.setRefreshToken(user.getRefreshToken());
        userRepository.save(updateUser);
        UserRecIntake userRecIntake = userRecIntakeRepository.findByUpdateDate(userInfoRequest.getRecInfo().getUpdateDate())
                .orElseThrow(() -> new CustomException(CustomExceptionList.USER_REC_INTAKE_NOT_FOUND_ERROR));
        UserRecIntake.updateUserRecIntake(user, userInfoRequest);
        userRecIntakeRepository.save(userRecIntake);

        List<UserCategory> userCategoryList = userCategoryRepository.findAllByUserId(userId);
        userCategoryRepository.deleteAll(userCategoryList);
        for (int i = 0; i < userInfoRequest.getCategoriesList().size(); i++) {
            UserCategoryInfo userCategoryInfo = getUserCategoryInfo(userInfoRequest.getCategoriesList().get(i).getUserCategoryInfoId());
            UserCategory userCategory = UserCategory.createUserCategory(user, userCategoryInfo);
            userCategoryRepository.save(userCategory);
            userCategory.getUser().getUserCategoryList().add(userCategory);
            userCategory.getUserCategoryInfo().getUserCategoryList().add(userCategory);
        }

        return userId;
    }

    private User getUser(Long userId) {
        return userRepository.findById(userId)
                .orElseThrow(() -> new CustomException(CustomExceptionList.USER_NOT_FOUND_ERROR));
    }

    private UserCategoryInfo getUserCategoryInfo(Integer userCategoryId) {
        return userCategoryInfoRepository.findById(userCategoryId)
                .orElseThrow(() -> new CustomException(CustomExceptionList.USER_CATEGORY_INFO_NOT_FOUND_ERROR));
    }

}
