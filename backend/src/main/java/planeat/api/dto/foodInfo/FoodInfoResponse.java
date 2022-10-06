package planeat.api.dto.foodinfo;

/*
 *
 * FoodInfoResponse
 *
 @author 박윤하
 @since 2022-09-20
*/

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import planeat.database.entity.FoodInfo;
import planeat.enums.FoodType;

@Getter
@Setter
@NoArgsConstructor
@ApiModel(value = "식품 정보(내 음식)", description = "식품 정보(내 음식) 조회에 대한 응답")
public class FoodInfoResponse {

    @ApiModelProperty(value = "식품 정보(내 음식) Id", example = "1")
    private Long foodInfoId;

    @ApiModelProperty(value = "식품 정보를 등록한 유저 Id - 1은 관리자", example = "1")
    private Long foodUser;

    @ApiModelProperty(value = "식품 정보(내 음식) 이름", example = "하리보 젤리")
    private String name;

    @ApiModelProperty(value = "식품 정보(내 음식) 제조사", example = "(주)오뚜기")
    private String manufacturer;

    @ApiModelProperty(value = "식품 정보(내 음식) 1회 제공량", example = "500")
    private Integer servingSize;

    @ApiModelProperty(value = "식품 정보(내 음식) 1회 제공량 단위", example = "g/ml")
    private String servingUnit;

    @ApiModelProperty(value = "식품 정보(내 음식) 총 내용량 g", example = "500")
    private Float capacityG;

    @ApiModelProperty(value = "식품 정보(내 음식) 총 내용량 ml", example = "500")
    private Float capacityMl;

    @ApiModelProperty(value = "식품 정보(내 음식) 칼로리(kcal)", example = "350.2")
    private Float calorie;

    @ApiModelProperty(value = "식품 정보(내 음식) 단백질(g)", example = "20.5")
    private Float protein;

    @ApiModelProperty(value = "식품 정보(내 음식) 지방(g)", example = "15.9")
    private Float fat;

    @ApiModelProperty(value = "식품 정보(내 음식) 탄수화물(g)", example = "16.4")
    private Float carbohydrate;

    @ApiModelProperty(value = "식품 정보(내 음식) 총 당류(g)", example = "10.1")
    private Float sugar;

    @ApiModelProperty(value = "식품 정보(내 음식) 총 식이섬유(g)", example = "13.4")
    private Float dietary_fiber;

    @ApiModelProperty(value = "식품 정보(내 음식) 칼슘(mg)", example = "2.5")
    private Float calcium;

    @ApiModelProperty(value = "식품 정보(내 음식) 철분(mg)", example = "1.6")
    private Float iron;

    @ApiModelProperty(value = "식품 정보(내 음식) 마그네슘(mg)", example = "2.7")
    private Float magnesium;

    @ApiModelProperty(value = "식품 정보(내 음식) 인(mg)", example = "3.1")
    private Float phosphorus;
    @ApiModelProperty(value = "식품 정보(내 음식) 칼륨(mg)", example = "2.3")
    private Float potassium;

    @ApiModelProperty(value = "식품 정보(내 음식) 나트륨(mg)", example = "84.2")
    private Float sodium;

    @ApiModelProperty(value = "식품 정보(내 음식) 아연(mg)", example = "91.8")
    private Float zinc;

    @ApiModelProperty(value = "식품 정보(내 음식) 구리(㎍)", example = "23.4")
    private Float copper;

    @ApiModelProperty(value = "식품 정보(내 음식) 망간(mg)", example = "12.3")
    private Float manganese;

    @ApiModelProperty(value = "식품 정보(내 음식) 셀레늄(㎍)", example = "10.5")
    private Float selenium;

    @ApiModelProperty(value = "식품 정보(내 음식) 비타민 A(㎍ RE)", example = "5.8")
    private Float vitaminA;

    @ApiModelProperty(value = "식품 정보(내 음식) 비타민 D(㎍)", example = "9.8")
    private Float vitaminD;

    @ApiModelProperty(value = "식품 정보(내 음식) 비타민 B6(㎍)", example = "11.7")
    private Float vitaminB6;

    @ApiModelProperty(value = "식품 정보(내 음식) 엽산 (DFE)(㎍)", example = "30.3")
    private Float folate;

    @ApiModelProperty(value = "식품 정보(내 음식) 비타민 B12(㎍)", example = "20.5")
    private Float vitaminB12;
    @ApiModelProperty(value = "식품 정보(내 음식) 비타민 C(mg)", example = "10.9")
    private Float vitaminC;

    @ApiModelProperty(value = "식품 정보(내 음식) 콜레스테롤(mg)", example = "52.3")
    private Float cholesterol;

    @ApiModelProperty(value = "식품 정보(내 음식) 총 포화지방산(mg)", example = "70.2")
    private Float fattyAcid;

    @ApiModelProperty(value = "식품 정보(내 음식) 리놀레산(mg)", example = "70.4")
    private Float linoleicAcid;

    @ApiModelProperty(value = "식품 정보(내 음식) 알파 리놀레산(mg)", example = "200.3")
    private Float alphaLinoleicAcid;

    @ApiModelProperty(value = "식품 정보(내 음식) 트랜스 지방산(mg)", example = "79.8")
    private Float transFattyAcid;

    @ApiModelProperty(value = "식품 정보(내 음식) 비타민 B1(mg)", example = "10.4")
    private Float vitaminB1;

    @ApiModelProperty(value = "식품 정보(내 음식) 비타민 B2(㎍)", example = "32.1")
    private Float vitaminB2;


    @Builder
    public FoodInfoResponse(Long foodInfoId, Long foodUser, FoodType foodType, String name, Integer year, String manufacturer, String categoryLarge, String categoryDetail, Integer servingSize, String servingUnit, Float capacityG, Float capacityMl, Float calorie, Float protein, Float fat, Float carbohydrate, Float sugar, Float dietary_fiber, Float calcium, Float iron, Float magnesium, Float phosphorus, Float potassium, Float sodium, Float zinc, Float copper, Float manganese, Float selenium, Float vitaminA, Float vitaminD, Float vitaminB6, Float folate, Float vitaminB12, Float vitaminC, Float cholesterol, Float fattyAcid, Float linoleicAcid, Float alphaLinoleicAcid, Float transFattyAcid, Float vitaminB1, Float vitaminB2) {
        this.foodInfoId = foodInfoId;
        this.foodUser = foodUser;
        this.name = name;
        this.manufacturer = manufacturer;
        this.servingSize = servingSize;
        this.servingUnit = servingUnit;
        this.capacityG = capacityG;
        this.capacityMl = capacityMl;
        this.calorie = calorie;
        this.protein = protein;
        this.fat = fat;
        this.carbohydrate = carbohydrate;
        this.sugar = sugar;
        this.dietary_fiber = dietary_fiber;
        this.calcium = calcium;
        this.iron = iron;
        this.magnesium = magnesium;
        this.phosphorus = phosphorus;
        this.potassium = potassium;
        this.sodium = sodium;
        this.zinc = zinc;
        this.copper = copper;
        this.manganese = manganese;
        this.selenium = selenium;
        this.vitaminA = vitaminA;
        this.vitaminD = vitaminD;
        this.vitaminB6 = vitaminB6;
        this.folate = folate;
        this.vitaminB12 = vitaminB12;
        this.vitaminC = vitaminC;
        this.cholesterol = cholesterol;
        this.fattyAcid = fattyAcid;
        this.linoleicAcid = linoleicAcid;
        this.alphaLinoleicAcid = alphaLinoleicAcid;
        this.transFattyAcid = transFattyAcid;
        this.vitaminB1 = vitaminB1;
        this.vitaminB2 = vitaminB2;
    }


    public static FoodInfoResponse createFoodInfoResponse(FoodInfo foodInfo) {
        FoodInfoResponse foodInfoResponse = FoodInfoResponse.builder()
                .foodInfoId(foodInfo.getId())
                .foodUser(foodInfo.getFoodUser())
                .foodType(foodInfo.getFoodType())
                .name(foodInfo.getName())
                .year(foodInfo.getYear())
                .manufacturer(foodInfo.getManufacturer())
                .categoryLarge(foodInfo.getCategoryLarge())
                .categoryDetail(foodInfo.getCategoryDetail())
                .servingSize(foodInfo.getServingSize())
                .servingUnit(foodInfo.getServingUnit())
                .capacityG(foodInfo.getCapacityG())
                .capacityMl(foodInfo.getCapacityMl())
                .calorie(foodInfo.getCalorie())
                .protein(foodInfo.getProtein())
                .fat(foodInfo.getFat())
                .carbohydrate(foodInfo.getCarbohydrate())
                .sugar(foodInfo.getSugar())
                .dietary_fiber(foodInfo.getDietary_fiber())
                .calcium(foodInfo.getCalcium())
                .iron(foodInfo.getIron())
                .magnesium(foodInfo.getMagnesium())
                .phosphorus(foodInfo.getPhosphorus())
                .potassium(foodInfo.getPotassium())
                .sodium(foodInfo.getSodium())
                .zinc(foodInfo.getZinc())
                .copper(foodInfo.getCopper())
                .manganese(foodInfo.getManganese())
                .selenium(foodInfo.getSelenium())
                .vitaminA(foodInfo.getVitaminA())
                .vitaminD(foodInfo.getVitaminD())
                .vitaminB6(foodInfo.getVitaminB6())
                .folate(foodInfo.getFolate())
                .vitaminB12(foodInfo.getVitaminB12())
                .vitaminC(foodInfo.getVitaminC())
                .cholesterol(foodInfo.getCholesterol())
                .fattyAcid(foodInfo.getFattyAcid())
                .linoleicAcid(foodInfo.getLinoleicAcid())
                .alphaLinoleicAcid(foodInfo.getAlphaLinoleicAcid())
                .transFattyAcid(foodInfo.getTransFattyAcid())
                .vitaminB1(foodInfo.getVitaminB1())
                .vitaminB2(foodInfo.getVitaminB2())
                .build();
        return foodInfoResponse;
    }

}
