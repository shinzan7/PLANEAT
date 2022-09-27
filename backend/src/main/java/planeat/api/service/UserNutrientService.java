package planeat.api.service;
/*
 *
 * 유저 영양제, 영양제 섭취기록 service
 *
 @author 신지한
 @since 2022-09-26
*/
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import planeat.api.dto.usernutrient.NutrientHistoryRequest;
import planeat.api.dto.usernutrient.UserNutrientRequest;
import planeat.api.dto.usernutrient.UserNutrientResponse;
import planeat.database.entity.Nutrient;
import planeat.database.entity.NutrientHistory;
import planeat.database.entity.User;
import planeat.database.entity.UserNutrient;
import planeat.database.repository.NutrientHistoryRepository;
import planeat.database.repository.NutrientRepository;
import planeat.database.repository.UserNutrientRepository;
import planeat.database.repository.UserRepository;
import planeat.exception.CustomException;
import planeat.exception.CustomExceptionList;

import javax.transaction.Transactional;
import java.util.LinkedList;
import java.util.List;
import java.util.Optional;

@Service
@Transactional
@RequiredArgsConstructor
public class UserNutrientService {

    private final UserNutrientRepository userNutrientRepository;
    private final NutrientHistoryRepository nutrientHistoryRepository;
    private final UserRepository userRepository;
    private final NutrientRepository nutrientRepository;

    /**
     * 해당 유저영양제id의 유저영양제 조회
     * @param id 유저영양제 id
     * @return 해당 id의 영양제와 각 섭취기록
     */
    public UserNutrientResponse readUserNutrientById(Long id){
        UserNutrientResponse userNutrientResponse = new UserNutrientResponse();

        Optional<UserNutrient> userNutrientOptional = userNutrientRepository.findById(id);

        //영양제 존재하면
        if(userNutrientOptional.isPresent()){
            UserNutrient userNutrient = userNutrientOptional.get();

            //영양제 섭취기록 list로 가져오기
            List<NutrientHistory> nutrientHistoryList = nutrientHistoryRepository.findAllByUserNutrientId(userNutrient.getId());
            List<UserNutrientResponse.NutriHistory> nutriHistoryList = new LinkedList<>();
            for (NutrientHistory n : nutrientHistoryList){
                UserNutrientResponse.NutriHistory history = new UserNutrientResponse.NutriHistory(
                        n.getId(),
                        n.getIntakeDate(),
                        n.getIntakeReal()
                );
                nutriHistoryList.add(history);
            }

            //영양제 정보 response에 저장
            userNutrientResponse = UserNutrientResponse.builder()
                    .userNutrientId(userNutrient.getId())
                    .userId(userNutrient.getUser().getId())
                    .nutrientName(userNutrient.getNutrient().getNutrientName())
                    .intakeRecommend(userNutrient.getIntakeRecommend())
                    .nutriHistoryList(nutriHistoryList)
                    .build();
        }

        return userNutrientResponse;
    }

    /**
     * 유저id로 모든 유저 영양제를 조회
     * @param userId 유저 영양제를 조회할 유저id
     * @return 유저 영양제리스트와 각 영양제 섭취기록 반환
     */
    public List<UserNutrientResponse> readAllUserNutrientByUserId(Long userId){
        UserNutrientResponse userNutrientResponse = new UserNutrientResponse();
        List<UserNutrientResponse> resultList = new LinkedList<>();

        List<UserNutrient> userNutrientList = userNutrientRepository.findAllByUserId(userId);

        for (UserNutrient u : userNutrientList){
            //영양제 섭취기록 list로 가져오기
            List<NutrientHistory> nutrientHistoryList = nutrientHistoryRepository.findAllByUserNutrientId(u.getId());
            List<UserNutrientResponse.NutriHistory> nutriHistoryList = new LinkedList<>();
            for (NutrientHistory n : nutrientHistoryList){
                UserNutrientResponse.NutriHistory history = new UserNutrientResponse.NutriHistory(
                        n.getId(),
                        n.getIntakeDate(),
                        n.getIntakeReal()
                );
                nutriHistoryList.add(history);
            }

            //영양제 정보 response에 저장
            userNutrientResponse = UserNutrientResponse.builder()
                    .userNutrientId(u.getId())
                    .userId(u.getUser().getId())
                    .nutrientName(u.getNutrient().getNutrientName())
                    .intakeRecommend(u.getIntakeRecommend())
                    .nutriHistoryList(nutriHistoryList)
                    .build();

            resultList.add(userNutrientResponse);
        }

        return resultList;
    }


    /**
     * 유저 영양제 등록
     * @param request 등록할 영양제 dto
     */
    public void createUserNutrient(UserNutrientRequest request){
        //연결할 user와 nutrient 찾기
        Optional<User> optionalUser = Optional.ofNullable(userRepository.findById(request.getUserId()).orElseThrow(
                () -> new CustomException(CustomExceptionList.USER_NOT_FOUND_ERROR)
        ));
        Optional<Nutrient> optionalNutrient = Optional.ofNullable(nutrientRepository.findById(request.getNutrientId()).orElseThrow(
                () -> new CustomException(CustomExceptionList.NUTRIENT_NOT_FOUND_ERROR)
        ));

        UserNutrient userNutrient = UserNutrient.builder()
                    .user(optionalUser.get())
                    .nutrient(optionalNutrient.get())
                    .intakeRecommend(request.getIntakeRecommend())
                    .build();
            userNutrientRepository.save(userNutrient);
    }

    /**
     * 유저 영양제 수정
     * @param userNutrientId 수정할 유저영양제 id
     * @param request 수정할 유저영양제 dto
     * @return 수정한 유저영양제 id
     */
    public Long updateUserNutrient(Long userNutrientId, UserNutrientRequest request){
        UserNutrient userNutrient = userNutrientRepository.findById(userNutrientId)
                .orElseThrow(() -> new CustomException(CustomExceptionList.USER_NUTRIENT_NOT_FOUND_ERROR));

        userNutrient.update(userNutrient.getUser(), userNutrient.getNutrient(), request.getIntakeRecommend());

        return userNutrientId;
    }

    /**
     * 유저 영양제 삭제
     * @param userNutrientId 삭제할 유저영양제 id
     * @return 삭제한 유저영양제 id
     */
    public Long deleteUserNutrient(Long userNutrientId){
        UserNutrient userNutrient = userNutrientRepository.findById(userNutrientId)
                .orElseThrow(() -> new CustomException(CustomExceptionList.USER_NUTRIENT_NOT_FOUND_ERROR));
        userNutrientRepository.delete(userNutrient);
        return userNutrientId;
    }


    /**
     * 영양제 섭취기록 등록
     * @param request 등록할 영양제 섭취기록 dto
     */
    public void createNutrientHistory(NutrientHistoryRequest request){
        //연결할 유저 영양제 찾기
        Optional<UserNutrient> optionalUserNutrient = Optional.ofNullable(userNutrientRepository.findById(request.getUserNutrientId()).orElseThrow(
                () -> new CustomException(CustomExceptionList.USER_NUTRIENT_NOT_FOUND_ERROR)
        ));

        NutrientHistory nutrientHistory = NutrientHistory.createUserNutrientHistory(
                optionalUserNutrient.get(),
                request.getIntakeDate(),
                request.getIntakeReal()
        );
        nutrientHistoryRepository.save(nutrientHistory);
    }

    /**
     * 영양제 섭취기록 수정
     * @param nutrientHistoryId 수정하는 영양제 섭취기록 id
     * @param request 수정하는 영양제 섭취기록 dto
     */
    public void updateNutrientHistory(Long nutrientHistoryId ,NutrientHistoryRequest request){
        NutrientHistory nutrientHistory = nutrientHistoryRepository.findById(nutrientHistoryId).orElseThrow(
                () -> new CustomException(CustomExceptionList.NUTRIENT_HISTORY_NOT_FOUND_ERROR)
        );
        nutrientHistory.update(nutrientHistory.getUserNutrient(), request.getIntakeDate(), request.getIntakeReal());
    }

    /**
     * 영양제 섭취기록 삭제
     * @param nutrientHistoryId 삭제할 영양제 섭취기록 id
     */
    public void deleteNutrientHistory(Long nutrientHistoryId){
        NutrientHistory nutrientHistory = nutrientHistoryRepository.findById(nutrientHistoryId).orElseThrow(
                () -> new CustomException(CustomExceptionList.NUTRIENT_HISTORY_NOT_FOUND_ERROR)
        );
        nutrientHistoryRepository.delete(nutrientHistory);
    }
}