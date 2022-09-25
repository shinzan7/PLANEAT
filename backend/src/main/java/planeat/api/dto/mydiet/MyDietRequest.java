package planeat.api.dto.mydiet;

/*
 *
 * MyDietRequest
 *
 @author 박윤하
 @since 2022-09-22
*/


import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.math.BigDecimal;
import java.util.List;


@Getter
@Setter
@NoArgsConstructor
public class MyDietRequest {

    private Long myDietId;
    private Long userId;
    private String dietName;
    private List<DietInfos> dietInfosList;

    @Getter
    @Setter
    @NoArgsConstructor
    static public class DietInfos {
        Long foodInfoId;
        BigDecimal amount;

        public DietInfos(Long foodInfoId, BigDecimal amount) {
            this.foodInfoId = foodInfoId;
            this.amount = amount;
        }
    }

    @Builder
    public MyDietRequest(Long myDietId, Long userId, String dietName, List<DietInfos> dietInfosList) {
        this.myDietId = myDietId;
        this.userId = userId;
        this.dietName = dietName;
        this.dietInfosList = dietInfosList;
    }

}
