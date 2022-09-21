package planeat.api.dto.nutrient;
/*
 *
 * NutrientRequest의 설명을 여기 작성한다.
 *
 @author 신지한
 @since 2022-09-21
*/
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class NutrientRequest {
    private Long userNutrientId;
    private Long userId;
    private Long nutrientId;
    private Integer intakeRecommend;
}
