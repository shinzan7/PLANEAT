package planeat.api.dto.intakehistory;

/*
 *
 * IntakeHistoryRequest
 *
 @author 박윤하
 @since 2022-09-25
*/

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import planeat.enums.MealType;

import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
public class IntakeHistoryRequest {

    private Long intakeHistoryId;
    private Long userId;
    private LocalDate date;
    @Enumerated(EnumType.STRING)
    private MealType mealType;
    private List<IntakeFoods> intakeFoodsList;

    @Getter
    @Setter
    @NoArgsConstructor
    static public class IntakeFoods {
        Long foodInfoId;
        BigDecimal amount;

        public IntakeFoods(Long foodInfoId, BigDecimal amount) {
            this.foodInfoId = foodInfoId;
            this.amount = amount;
        }
    }

    @Builder
    public IntakeHistoryRequest(Long intakeHistoryId, Long userId, MealType mealType, List<IntakeFoods> intakeFoodsList) {
        this.intakeHistoryId = intakeHistoryId;
        this.userId = userId;
        this.mealType = mealType;
        this.intakeFoodsList = intakeFoodsList;
    }

}
