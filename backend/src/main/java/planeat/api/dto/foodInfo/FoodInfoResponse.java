package planeat.api.dto.foodInfo;

/*
 *
 * FoodInfoResponse
 *
 @author 박윤하
 @since 2022-09-20
*/

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import planeat.database.entity.FoodInfo;
import planeat.enums.FoodType;

@Getter
@Setter
@NoArgsConstructor
public class FoodInfoResponse {


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


    @Builder
    public FoodInfoResponse(Long foodInfoId, Long foodUser, FoodType foodType, String name, Integer year, String manufacturer, String categoryLarge, String categoryDetail, Integer servingSize, String servingUnit, Float capacityG, Float capacityMl, Float calorie, Float protein, Float fat, Float carbohydrate, Float sugar, Float dietary_fiber, Float calcium, Float iron, Float magnesium, Float phosphorus, Float potassium, Float sodium, Float zinc, Float copper, Float manganese, Float selenium, Float vitaminA, Float vitaminD, Float vitaminB6, Float folate, Float vitaminB12, Float vitaminC, Float cholesterol, Float fattyAcid, Float linoleicAcid, Float alphaLinoleicAcid, Float transFattyAcid, Float vitaminB1, Float vitaminB2) {
        this.foodInfoId = foodInfoId;
        this.foodUser = foodUser;
        this.foodType = foodType;
        this.name = name;
        this.year = year;
        this.manufacturer = manufacturer;
        this.categoryLarge = categoryLarge;
        this.categoryDetail = categoryDetail;
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
