package planeat.database.entity;
/*
 *
 * 유저의 날짜별 영양섭취 상세기록 데이터
 *
 @author 신지한
 @since 2022-09-15
*/
import lombok.*;
import org.hibernate.annotations.DynamicUpdate;

import javax.persistence.*;

@Entity
@Getter
@DynamicUpdate
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Table(name = "analysis_history")
public class AnalysisHistory {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "analysis_history_id")
    private Long id;

    @ManyToOne
    private User user;
    private String analysis_score;

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
    @Column(name = "vitamin_a")
    private Float vitaminA;
    @Column(name = "vitamin_d")
    private Float vitaminD;
    private Float vitaminB6;
    private Float folate;
    private Float vitaminB12;
    @Column(name = "vitamin_c")
    private Float vitaminC;
    private Float cholesterol;
    private Float fattyAcid;
    private Float linoleicAcid;
    private Float alphaLinoleicAcid;
    private Float transFattyAcid;
    private Float vitaminB1;
    private Float vitaminB2;

    @Builder
    public AnalysisHistory(Long id, User user, String analysis_score, Float calorie, Float protein, Float fat, Float carbohydrate, Float sugar, Float dietary_fiber, Float calcium, Float iron, Float magnesium, Float phosphorus, Float potassium, Float sodium, Float zinc, Float copper, Float manganese, Float selenium, Float vitaminA, Float vitaminD, Float vitaminB6, Float folate, Float vitaminB12, Float vitaminC, Float cholesterol, Float fattyAcid, Float linoleicAcid, Float alphaLinoleicAcid, Float transFattyAcid, Float vitaminB1, Float vitaminB2) {
        this.id = id;
        this.user = user;
        this.analysis_score = analysis_score;
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

    public AnalysisHistory update(String analysis_score, Float calorie, Float protein, Float fat, Float carbohydrate, Float sugar, Float dietary_fiber, Float calcium, Float iron, Float magnesium, Float phosphorus, Float potassium, Float sodium, Float zinc, Float copper, Float manganese, Float selenium, Float vitaminA, Float vitaminD, Float vitaminB6, Float folate, Float vitaminB12, Float vitaminC, Float cholesterol, Float fattyAcid, Float linoleicAcid, Float alphaLinoleicAcid, Float transFattyAcid, Float vitaminB1, Float vitaminB2) {
        this.analysis_score = analysis_score;
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
        return this;
    }
}
