package planeat.api.dto.usernutrient;
/*
 *
 * 유저id에 해당하는 유저 영양제 + 영양제 섭취기록
 *
 @author 신지한
 @since 2022-09-26
*/
import lombok.*;
import org.springframework.format.annotation.DateTimeFormat;

import java.time.LocalDate;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
public class UserNutrientResponse {
    Long userNutrientId;
    Long userId;
    String nutrientName;
    Integer intakeRecommend;
    List<NutriHistory> nutriHistoryList;

    @Getter @Setter
    @AllArgsConstructor
    public static class NutriHistory{
        Long nutrientHistoryId;
        String intakeDate;
        Integer intakeReal;
    }

    @Builder
    public UserNutrientResponse(Long userNutrientId, Long userId, String nutrientName, Integer intakeRecommend, List<NutriHistory> nutriHistoryList) {
        this.userNutrientId = userNutrientId;
        this.userId = userId;
        this.nutrientName = nutrientName;
        this.intakeRecommend = intakeRecommend;
        this.nutriHistoryList = nutriHistoryList;
    }

    @Override
    public String toString() {
        return "UserNutrientResponse{" +
                "userNutrientId=" + userNutrientId +
                ", userId=" + userId +
                ", nutrientName='" + nutrientName + '\'' +
                ", intakeRecommend=" + intakeRecommend +
                ", nutriHistoryList=" + nutriHistoryList +
                '}';
    }
}
