package planeat.api.dto.usernutrient;
/*
 *
 * 영양제 섭취기록 등록 dto
 *
 @author 신지한
 @since 2022-09-26
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
public class NutrientHistoryResponse {

    Long userNutrientId;
    @DateTimeFormat(pattern = "yyyy-MM-dd")
    LocalDate intakeDate;
    Integer intakeReal;

    @Builder
    public NutrientHistoryResponse(Long userNutrientId, LocalDate intakeDate, Integer intakeReal) {
        this.userNutrientId = userNutrientId;
        this.intakeDate = intakeDate;
        this.intakeReal = intakeReal;
    }

}
