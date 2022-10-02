package planeat.api.dto.usernutrient;
/*
 *
 * 영양제 섭취기록 등록 dto
 *
 @author 신지한
 @since 2022-09-26
*/
import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.format.annotation.DateTimeFormat;

import java.time.LocalDate;

@Getter
@Setter
@NoArgsConstructor
public class NutrientHistoryRequest {

    Long userNutrientId;

    @DateTimeFormat(pattern = "yyyy-MM-dd")
    LocalDate intakeDate;
    Integer intakeReal;

    @Builder
    public NutrientHistoryRequest(Long userNutrientId, LocalDate intakeDate, Integer intakeReal) {
        this.userNutrientId = userNutrientId;
        this.intakeDate = intakeDate;
        this.intakeReal = intakeReal;
    }

    @Override
    public String toString() {
        return "NutrientHistoryRequest{" +
                "userNutrientId=" + userNutrientId +
                ", intakeDate=" + intakeDate +
                ", intakeReal=" + intakeReal +
                '}';
    }
}
