package planeat.api.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import planeat.api.dto.analysishistory.AnalysisHistoryRequest;
import planeat.database.entity.AnalysisHistory;
import planeat.database.entity.User;
import planeat.database.repository.AnalysisHistoryRepository;
import planeat.database.repository.UserRepository;
import planeat.exception.CustomException;
import planeat.exception.CustomExceptionList;

import javax.transaction.Transactional;

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
                .analysis_type(1) // 실제섭취량: 1, 권장섭취량 : 2
                .analysis_score("좋음") // 점수계산??
                .calorie(request.getCalorie())
                .protein(request.getProtein())
                .fat(request.getFat())
                .carbohydrate(request.getCarbohydrate())
                .sugar(request.getSugar())
                .dietary_fiber(request.getDietary_fiber())
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
}
