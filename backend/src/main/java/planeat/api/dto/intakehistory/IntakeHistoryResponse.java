package planeat.api.dto.intakehistory;

/*
 *
 * IntakeHistoryResponse
 *
 @author 박윤하
 @since 2022-09-25
*/

import lombok.Builder;
import lombok.Getter;
import planeat.database.entity.FoodInfo;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;

@Getter
public class IntakeHistoryResponse {

    private Long intakeHistoryId;
    private LocalDate date;
    private String mealType;
    private List<IntakeFoods> intakeFoodsList;

    @Getter
    static public class IntakeFoods {
        FoodInfo foodInfo;
        BigDecimal amount;

        public IntakeFoods(FoodInfo foodInfo, BigDecimal amount) {
            this.foodInfo = foodInfo;
            this.amount = amount;
        }
    }

    @Builder
    public IntakeHistoryResponse(Long intakeHistoryId, LocalDate date, String mealType, List<IntakeFoods> intakeFoodsList) {
        this.intakeHistoryId = intakeHistoryId;
        this.date = date;
        this.mealType = mealType;
        this.intakeFoodsList = intakeFoodsList;
    }

    public static IntakeHistoryResponse createIntakeHistoryResponse(Long intakeHistoryId, String mealType, List<IntakeFoods> intakeFoodsList) {
        IntakeHistoryResponse intakeHistoryResponse = IntakeHistoryResponse.builder()
                .intakeHistoryId(intakeHistoryId)
                .mealType(mealType)
                .intakeFoodsList(intakeFoodsList)
                .build();
        return intakeHistoryResponse;
    }

}
