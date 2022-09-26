package planeat.api.dto.mydiet;

/*
 *
 * MyDietResponse
 *
 @author 박윤하
 @since 2022-09-22
*/

import lombok.Builder;
import lombok.Getter;
import planeat.database.entity.FoodInfo;

import java.math.BigDecimal;
import java.util.List;

@Getter
public class MyDietResponse {

    private Long myDietId;
    private String dietName;
    private List<DietInfos> dietInfosList;

    @Getter
    static public class DietInfos {
        FoodInfo foodInfo;
        BigDecimal amount;

        public DietInfos(FoodInfo foodInfo, BigDecimal amount) {
            this.foodInfo = foodInfo;
            this.amount = amount;
        }
    }

    @Builder
    public MyDietResponse(Long myDietId, String dietName, List<DietInfos> dietInfosList) {
        this.myDietId = myDietId;
        this.dietName = dietName;
        this.dietInfosList = dietInfosList;
    }

    public static MyDietResponse createMyDietResponse(Long myDietId, String dietName, List<DietInfos> dietInfosList) {
        MyDietResponse myDietResponse = MyDietResponse.builder()
                .myDietId(myDietId)
                .dietName(dietName)
                .dietInfosList(dietInfosList)
                .build();
        return myDietResponse;
    }

}
