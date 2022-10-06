package planeat.api.dto.usernutrient;
/*
 *
 * 유저 영양제를 등록하는 dto
 *
 @author 신지한
 @since 2022-09-26
*/

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.experimental.SuperBuilder;

@Getter
@Setter
@NoArgsConstructor
@SuperBuilder
public class UserNutrientRequest {
    Long userId;
    Long nutrientId;
    Integer intakeRecommend;
}
