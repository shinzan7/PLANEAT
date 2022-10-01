package planeat.api.dto.foodinfo;

/*
 *
 * FoodInfoRequest
 *
 @author 박윤하
 @since 2022-09-20
*/

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.validation.constraints.NotBlank;

@Getter
@Setter
@NoArgsConstructor
@ApiModel(value = "식품 정보(내 음식)", description = "식품 정보(내 음식) 등록/수정에 대한 요청")
public class FoodInfoRequest {

    @ApiModelProperty(value="수정할 식품 정보(내 음식) Id - 등록 시에는 입력X", example = "1")
    private Long foodInfoId;

    @ApiModelProperty(value="식품 정보를 등록할 유저 Id", example = "1", required = true)
    @NotBlank(message = "유저 Id 정보가 입력되지 않았습니다.")
    private Long foodUser;

    @ApiModelProperty(value="식품 정보(내 음식) 이름", example = "하리보 젤리", required = true)
    @NotBlank(message = "식품 정보(내 음식) 이름 정보가 입력되지 않았습니다.")
    private String name;

    @ApiModelProperty(value="식품 정보(내 음식) 1회 제공량", example = "500", required = true)
    @NotBlank(message = "식품 정보(내 음식) 1회 제공량 정보가 입력되지 않았습니다.")
    private Integer servingSize;

    @ApiModelProperty(value="식품 정보(내 음식) 1회 제공량 단위", example = "g/ml", required = true)
    @NotBlank(message = "식품 정보(내 음식) 1회 제공량 단위 정보가 입력되지 않았습니다.")
    private String servingUnit;

    @ApiModelProperty(value="식품 정보(내 음식) 칼로리(kcal)", example = "350.2", required = true)
    @NotBlank(message = "식품 정보(내 음식)의 칼로리 정보가 입력되지 않았습니다.")
    private Float calorie;

    @ApiModelProperty(value="식품 정보(내 음식) 단백질(g)", example = "20.5", required = true)
    @NotBlank(message = "식품 정보(내 음식)의 단백질 정보가 입력되지 않았습니다.")
    private Float protein;

    @ApiModelProperty(value="식품 정보(내 음식) 지방(g)", example = "15.9", required = true)
    @NotBlank(message = "식품 정보(내 음식)의 지방 정보가 입력되지 않았습니다.")
    private Float fat;

    @ApiModelProperty(value="식품 정보(내 음식) 탄수화물(g)", example = "16.4", required = true)
    @NotBlank(message = "식품 정보(내 음식)의 탄수화물 정보가 입력되지 않았습니다.")
    private Float carbohydrate;

    @ApiModelProperty(value="식품 정보(내 음식) 총 당류(g)", example = "10.1")
    private Float sugar;

    @ApiModelProperty(value="식품 정보(내 음식) 총 식이섬유(g)", example = "13.4")
    private Float dietary_fiber;

    @ApiModelProperty(value="식품 정보(내 음식) 칼슘(mg)", example = "2.5")
    private Float calcium;

    @ApiModelProperty(value="식품 정보(내 음식) 철분(mg)", example = "1.6")
    private Float iron;

    @ApiModelProperty(value="식품 정보(내 음식) 칼륨(mg)", example = "2.3")
    private Float potassium;

    @ApiModelProperty(value="식품 정보(내 음식) 나트륨(mg)", example = "20.5")
    private Float sodium;

    @ApiModelProperty(value="식품 정보(내 음식) 비타민 A(㎍ RE)", example = "10.8")
    private Float vitaminA;

    @ApiModelProperty(value="식품 정보(내 음식) 비타민 C(mg)", example = "17.2")
    private Float vitaminC;

    @ApiModelProperty(value="식품 정보(내 음식) 콜레스테롤(mg)", example = "4.8")
    private Float cholesterol;

}
