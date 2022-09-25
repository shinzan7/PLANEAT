package planeat.api.dto.foodinfo;

/*
 *
 * FoodInfoRequest
 *
 @author 박윤하
 @since 2022-09-20
*/

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import planeat.enums.FoodType;

@Getter
@Setter
@NoArgsConstructor
public class FoodInfoRequest {

    private Long foodInfoId;
    private Long foodUser;
    private FoodType foodType;
    private String name;
    private Integer year;
    private String manufacturer;
    private String categoryLarge;
    private String categoryDetail;
    private Integer servingSize;
    private String servingUnit;
    private Float capacityG;
    private Float capacityMl;
    private Float calorie;
    private Float protein;
    private Float fat;
    private Float carbohydrate;
    private Float sugar;
    private Float dietary_fiber;
    private Float calcium;
    private Float iron;
    private Float magnesium;
    private Float phosphorus;
    private Float potassium;
    private Float sodium;
    private Float zinc;
    private Float copper;
    private Float manganese;
    private Float selenium;
    private Float vitaminA;
    private Float vitaminD;
    private Float vitaminB6;
    private Float folate;
    private Float vitaminB12;
    private Float vitaminC;
    private Float cholesterol;
    private Float fattyAcid;
    private Float linoleicAcid;
    private Float alphaLinoleicAcid;
    private Float transFattyAcid;
    private Float vitaminB1;
    private Float vitaminB2;

}
