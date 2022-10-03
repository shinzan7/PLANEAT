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
import planeat.api.dto.usernutrient.*;
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
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.LinkedList;
import java.util.List;

@Service
@Transactional
@RequiredArgsConstructor
public class UserNutrientService {

    private final UserNutrientRepository userNutrientRepository;
    private final NutrientHistoryRepository nutrientHistoryRepository;
    private final UserRepository userRepository;
    private final NutrientRepository nutrientRepository;
    private final AnalysisHistoryService analysisHistoryService;

    /**
     * 해당 유저의 유저영양제와 섭취기록을 설정한 날짜 사이에 해당하는 데이터만 가져온다
     * @param userId
     * @param startDate 검색날짜 from
     * @param endDate 검색날짜 to
     * @return List<유저 영양제 + List<영양제 섭취기록>>
     */
    public List<UserNutrientResponse> readUserNutrientListByUserIdAndPeriod(Long userId, LocalDate startDate, LocalDate endDate){
        List<UserNutrientResponse> responseList = new LinkedList<>();
        List<UserNutrient> userNutrientList = userNutrientRepository.findByUser_Id(userId);
        UserNutrientResponse response = new UserNutrientResponse();

        //userId 해당하는 모든 유저 영양제를 가져오기
        for (UserNutrient u : userNutrientList){
            response = UserNutrientResponse.builder()
                    .userNutrientId(u.getId())
                    .userId(userId)
                    .nutrientName(u.getNutrient().getNutrientName())
                    .intakeRecommend(u.getIntakeRecommend())
                    .nutriHistoryList(new ArrayList<>())
                    .build();
            //해당 유저영양제의 섭취기록 리스트 불러오기
            for (NutrientHistory n : u.getNutrientHistoryList()){
                //지정날짜 사이에 있으면 response에 추가하기
                if(n.getIntakeDate().isAfter(startDate) && n.getIntakeDate().isBefore(endDate)){
                    response.getNutriHistoryList().add(new UserNutrientResponse.NutriHistory(
                            n.getId(), n.getIntakeDate().toString(), n.getIntakeReal()
                    ));
                }
            }
            //필터링 끝난 response를 추가하기
            responseList.add(response);
        }

        return responseList;
    }

    /**
     * 해당 유저의 섭취날짜로 섭취기록 조회
     * @param userId 유저id
     * @param intakeDateString 섭취날짜
     * @return 유저영양제id, 권장섭취횟수, 섭취날짜, 실제섭취횟수
     */
    public List<NutrientHistoryDateResponse> readNutrientHistoryByDate(Long userId, String intakeDateString){
        LocalDate intakeDate = LocalDate.parse(intakeDateString, DateTimeFormatter.ISO_DATE);
        List<UserNutrient> userNutrientList = userNutrientRepository.findByUser_Id(userId);
        List<NutrientHistoryDateResponse> responseList = new ArrayList<>();

        for (UserNutrient u : userNutrientList){
            NutrientHistory nutrientHistory = nutrientHistoryRepository.findByUserNutrientAndIntakeDate(u, intakeDate);
            responseList.add(
                    NutrientHistoryDateResponse.builder()
                            .userNutrientId(u.getId())
                            .intakeRecommend(u.getIntakeRecommend())
                            .intakeDate(intakeDateString)
                            .intakeReal(nutrientHistory.getIntakeReal())
                            .build()
            );
        }

        return responseList;
    }

    /**
     * 유저id로 모든 유저 영양제를 조회
     * @param userId 유저 영양제를 조회할 유저id
     * @return 유저 영양제리스트와 각 영양제 섭취기록 반환
     */
    public List<UserNutrientResponse> readAllUserNutrientByUserId(Long userId){
        UserNutrientResponse userNutrientResponse = new UserNutrientResponse();
        List<UserNutrientResponse> resultList = new LinkedList<>();

        List<UserNutrient> userNutrientList = userNutrientRepository.findByUser_Id(userId);

        for (UserNutrient u : userNutrientList){
            //영양제 섭취기록 list로 가져오기
            List<NutrientHistory> nutrientHistoryList = nutrientHistoryRepository.findAllByUserNutrientId(u.getId());
            List<UserNutrientResponse.NutriHistory> nutriHistoryList = new LinkedList<>();
            for (NutrientHistory n : nutrientHistoryList){
                UserNutrientResponse.NutriHistory history = new UserNutrientResponse.NutriHistory(
                        n.getId(),
                        n.getIntakeDate().toString(),
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
        User user = userRepository.findById(request.getUserId()).orElseThrow(
                () -> new CustomException(CustomExceptionList.USER_NOT_FOUND_ERROR)
        );
        Nutrient nutrient = nutrientRepository.findById(request.getNutrientId()).orElseThrow(
                () -> new CustomException(CustomExceptionList.NUTRIENT_NOT_FOUND_ERROR)
        );

        UserNutrient userNutrient = UserNutrient.builder()
                    .user(user)
                    .nutrient(nutrient)
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
    public Long createNutrientHistory(Long userId, NutrientHistoryRequest request){
        //연결할 유저 영양제 찾기
        UserNutrient userNutrient = userNutrientRepository.findById(request.getUserNutrientId()).orElseThrow(
                () -> new CustomException(CustomExceptionList.USER_NUTRIENT_NOT_FOUND_ERROR)
        );

        //추가된 영양제 함량만큼 해당날짜의 분석기록에 추가
        analysisHistoryService.addUserNutrientFromAnalysisHistory(userId, request);

        NutrientHistory nutrientHistory = NutrientHistory.createUserNutrientHistory(
                userNutrient,
                request.getIntakeDate(),
                request.getIntakeReal()
        );
        NutrientHistory save = nutrientHistoryRepository.save(nutrientHistory);
        return save.getId();
    }

    /**
     * 영양제 섭취기록 수정 (날짜와 영양제id로 조회)
     * @param request 수정하는 영양제 섭취기록 dto
     */
    public List<String> updateNutrientHistory(Long userId, NutrientHistoryRequest request){
        UserNutrient userNutrient = userNutrientRepository.findById(request.getUserNutrientId()).orElseThrow(
                () -> new CustomException(CustomExceptionList.USER_NUTRIENT_NOT_FOUND_ERROR)
        );

        //기존의 영양제 섭취기록 데이터 originDataRequest에 담기
        NutrientHistory originHistory = nutrientHistoryRepository.findByUserNutrientAndIntakeDate(userNutrient, request.getIntakeDate());
        NutrientHistoryRequest originDataRequest = NutrientHistoryRequest.builder()
                .userNutrientId(userNutrient.getId())
                .intakeDate(originHistory.getIntakeDate())
                .intakeReal(originHistory.getIntakeReal())
                .build();

        //제거된 영양제 함량만큼 해당날짜의 분석기록에서 차감
        analysisHistoryService.minusUserNutrientFromAnalysisHistory(userId, originDataRequest);
        //업데이트되는 영양제 함량만큼 해당날짜의 분석기록에 추가
        analysisHistoryService.addUserNutrientFromAnalysisHistory(userId, request);

        NutrientHistory nutrientHistory = nutrientHistoryRepository.findByIntakeDateAndUserNutrient(request.getIntakeDate(), userNutrient);
        nutrientHistory.update(userNutrient, request.getIntakeDate(), request.getIntakeReal());
        List<String> list = new ArrayList<>();
        list.add(userNutrient.getId().toString());
        list.add(nutrientHistory.getIntakeDate().toString());
        list.add(nutrientHistory.getIntakeReal().toString());
        return list;
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