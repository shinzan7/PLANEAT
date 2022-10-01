package planeat.database.entity;
/*
 *
 * FoodInfo의 설명을 여기 작성한다.
 * 음식의 세부정보 data
 *
 @author 신지한, 박윤하
 @since 2022-09-14
*/
import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.*;
import org.hibernate.annotations.DynamicUpdate;
import planeat.api.dto.foodinfo.FoodInfoRequest;
import planeat.enums.FoodType;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@DynamicUpdate
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Table(name = "food_info")
public class FoodInfo {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "food_info_id")
    private Long id;

    @Column(name = "food_user", nullable = false)
    private Long foodUser;

    @Enumerated(EnumType.STRING)
    @Column(name = "food_type")
    private FoodType foodType;

    @Column(name = "name", nullable = false)
    private String name;

    @Column(name = "year")
    private Integer year;

    @Column(name = "manufacturer")
    private String manufacturer;

    @Column(name = "category_large")
    private String categoryLarge;

    @Column(name = "category_detail")
    private String categoryDetail;

    @Column(name = "serving_size")
    private Integer servingSize;

    @Column(name = "serving_unit")
    private String servingUnit;

    @Column(name = "capacity_g")
    private Float capacityG;

    @Column(name = "capacity_ml")
    private Float capacityMl;

    @Column(name = "calorie")
    private Float calorie;

    @Column(name = "protein")
    private Float protein;

    @Column(name = "fat")
    private Float fat;

    @Column(name = "carbohydrate")
    private Float carbohydrate;

    @Column(name = "sugar")
    private Float sugar;

    @Column(name = "dietary_fiber")
    private Float dietary_fiber;

    @Column(name = "calcium")
    private Float calcium;

    @Column(name = "iron")
    private Float iron;

    @Column(name = "magnesium")
    private Float magnesium;

    @Column(name = "phosphorus")
    private Float phosphorus;

    @Column(name = "potassium")
    private Float potassium;

    @Column(name = "sodium")
    private Float sodium;

    @Column(name = "zinc")
    private Float zinc;

    @Column(name = "copper")
    private Float copper;

    @Column(name = "manganese")
    private Float manganese;

    @Column(name = "selenium")
    private Float selenium;

    @Column(name = "vitamin_a")
    private Float vitaminA;

    @Column(name = "vitamin_d")
    private Float vitaminD;

    @Column(name = "vitamin_b6")
    private Float vitaminB6;

    @Column(name = "folate")
    private Float folate;

    @Column(name = "vitamin_b12")
    private Float vitaminB12;

    @Column(name = "vitamin_c")
    private Float vitaminC;

    @Column(name = "cholesterol")
    private Float cholesterol;

    @Column(name = "fattyAcid")
    private Float fattyAcid;

    @Column(name = "linoleic_acid")
    private Float linoleicAcid;

    @Column(name = "alpha_linoleic_acid")
    private Float alphaLinoleicAcid;

    @Column(name = "trans_fatty_acid")
    private Float transFattyAcid;

    @Column(name = "vitamin_b1")
    private Float vitaminB1;

    @Column(name = "vitamin_b2")
    private Float vitaminB2;


    @JsonIgnore
    @OneToMany(cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.LAZY, mappedBy = "foodInfo")
    List<DietInfo> dietInfoList = new ArrayList<>();

    @JsonIgnore
    @OneToMany(cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.LAZY, mappedBy = "foodInfo")
    List<IntakeFood> intakeFoodList = new ArrayList<>();


    @Builder
    public FoodInfo(Long id, Long foodUser, FoodType foodType, String name, Integer year, String manufacturer, String categoryLarge, String categoryDetail, Integer servingSize, String servingUnit, Float capacityG, Float capacityMl, Float calorie, Float protein, Float fat, Float carbohydrate, Float sugar, Float dietary_fiber, Float calcium, Float iron, Float magnesium, Float phosphorus, Float potassium, Float sodium, Float zinc, Float copper, Float manganese, Float selenium, Float vitaminA, Float vitaminD, Float vitaminB6, Float folate, Float vitaminB12, Float vitaminC, Float cholesterol, Float fattyAcid, Float linoleicAcid, Float alphaLinoleicAcid, Float transFattyAcid, Float vitaminB1, Float vitaminB2) {
        this.id = id;
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


    public void setId(Long id) { this.id = id; }

    public void setFoodUser(Long foodUser) { this.foodUser = foodUser; }

    public void setName(String name) { this.name = name; }

    public void setServingSize(Integer servingSize) { this.servingSize = servingSize; }

    public void setServingUnit(String servingUnit) { this.servingUnit = servingUnit; }

    public void setCapacityG(Float capacityG) { this.capacityG = capacityG; }

    public void setCapacityMl(Float capacityMl) { this.capacityMl = capacityMl; }

    public void setCalorie(Float calorie) { this.calorie = calorie; }

    public void setProtein(Float protein) { this.protein = protein; }

    public void setFat(Float fat) { this.fat = fat; }

    public void setCarbohydrate(Float carbohydrate) { this.carbohydrate = carbohydrate; }

    public void setSugar(Float sugar) { this.sugar = sugar; }

    public void setDietary_fiber(Float dietary_fiber) { this.dietary_fiber = dietary_fiber; }

    public void setCalcium(Float calcium) { this.calcium = calcium; }

    public void setIron(Float iron) { this.iron = iron; }

    public void setPotassium(Float potassium) { this.potassium = potassium; }

    public void setSodium(Float sodium) { this.sodium = sodium; }

    public void setVitaminA(Float vitaminA) { this.vitaminA = vitaminA; }

    public void setVitaminC(Float vitaminC) { this.vitaminC = vitaminC; }

    public void setCholesterol(Float cholesterol) { this.cholesterol = cholesterol; }

    public static FoodInfo createFoodInfo(Long userId, FoodInfoRequest foodInfoRequest) {
        FoodInfo foodInfo = FoodInfo.builder()
                .foodUser(userId)
                .name(foodInfoRequest.getName())
                .servingSize(foodInfoRequest.getServingSize())
                .servingUnit(foodInfoRequest.getServingUnit())
                .calorie(foodInfoRequest.getCalorie())
                .protein(foodInfoRequest.getProtein())
                .fat(foodInfoRequest.getFat())
                .carbohydrate(foodInfoRequest.getCarbohydrate())
                .sugar(foodInfoRequest.getSugar())
                .dietary_fiber(foodInfoRequest.getDietary_fiber())
                .calcium(foodInfoRequest.getCalcium())
                .iron(foodInfoRequest.getIron())
                .potassium(foodInfoRequest.getPotassium())
                .sodium(foodInfoRequest.getSodium())
                .vitaminA(foodInfoRequest.getVitaminA())
                .vitaminC(foodInfoRequest.getVitaminC())
                .cholesterol(foodInfoRequest.getCholesterol())
                .build();
        return foodInfo;
    }

    public static FoodInfo updateFoodInfo(Long userId, FoodInfoRequest foodInfoRequest) {
        FoodInfo foodInfo = new FoodInfo();
            foodInfo.setId(foodInfoRequest.getFoodInfoId());
            foodInfo.setFoodUser(userId);
            foodInfo.setName(foodInfoRequest.getName());
            foodInfo.setServingSize(foodInfoRequest.getServingSize());
            foodInfo.setServingUnit(foodInfoRequest.getServingUnit());
            foodInfo.setCalorie(foodInfoRequest.getCalorie());
            foodInfo.setProtein(foodInfoRequest.getProtein());
            foodInfo.setFat(foodInfoRequest.getFat());
            foodInfo.setCarbohydrate(foodInfoRequest.getCarbohydrate());
            foodInfo.setSugar(foodInfoRequest.getSugar());
            foodInfo.setDietary_fiber(foodInfoRequest.getDietary_fiber());
            foodInfo.setCalcium(foodInfoRequest.getCalcium());
            foodInfo.setIron(foodInfoRequest.getIron());
            foodInfo.setPotassium(foodInfoRequest.getPotassium());
            foodInfo.setSodium(foodInfoRequest.getSodium());
            foodInfo.setVitaminA(foodInfoRequest.getVitaminA());
            foodInfo.setVitaminC(foodInfoRequest.getVitaminC());
            foodInfo.setCholesterol(foodInfoRequest.getCholesterol());
        return foodInfo;
    }

}
