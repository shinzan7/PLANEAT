package planeat.api.dto.usernutrient;
/*
 *
 * 유저id와 날짜를 받아 반환하는 dto
 *
 @author 신지한
 @since 2022-09-30
*/
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.format.annotation.DateTimeFormat;

import java.time.LocalDate;

@Getter
@Setter
@NoArgsConstructor
public class NutrientHistoryDateResponse {

    Long userNutrientId;
    Integer intakeRecommend;
    String intakeDate;
    Integer intakeReal;

    @Builder
    public NutrientHistoryDateResponse(Long userNutrientId, Integer intakeRecommend, String intakeDate, Integer intakeReal) {
        this.userNutrientId = userNutrientId;
        this.intakeRecommend = intakeRecommend;
        this.intakeDate = intakeDate;
        this.intakeReal = intakeReal;
    }
}
