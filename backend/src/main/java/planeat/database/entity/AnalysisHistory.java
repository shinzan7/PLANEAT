package planeat.database.entity;
/*
 *
 * 유저의 날짜별 영양섭취 상세기록 데이터
 *
 @author 신지한
 @since 2022-09-15
*/

import lombok.*;
import net.minidev.json.annotate.JsonIgnore;
import org.hibernate.annotations.DynamicUpdate;
import org.springframework.format.annotation.DateTimeFormat;

import javax.persistence.*;
import java.time.LocalDate;

@Entity
@Getter
@DynamicUpdate
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Table(name = "analysis_history")
public class AnalysisHistory {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "analysis_history_id")
    private Long id;

    @JsonIgnore
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private User user;

    @DateTimeFormat(pattern = "yyyy-MM-dd")
    @Column(nullable = false)
    private LocalDate date;

    @Column(nullable = false)
    private Integer analysisType;
    @Column(nullable = false)
    private String analysisScore;

    private Float calorie;
    private Float protein;
    private Float fat;
    private Float carbohydrate;
    private Float sugar;
    private Float dietaryFiber;
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
    public AnalysisHistory(Long id, User user, LocalDate date, Integer analysisType, String analysisScore, Float calorie, Float protein, Float fat, Float carbohydrate, Float sugar, Float dietaryFiber, Float calcium, Float iron, Float magnesium, Float phosphorus, Float potassium, Float sodium, Float zinc, Float copper, Float manganese, Float selenium, Float vitaminA, Float vitaminD, Float vitaminB6, Float folate, Float vitaminB12, Float vitaminC, Float cholesterol, Float fattyAcid, Float linoleicAcid, Float alphaLinoleicAcid, Float transFattyAcid, Float vitaminB1, Float vitaminB2) {
        this.id = id;
        this.user = user;
        this.date = date;
        this.analysisType = analysisType;
        this.analysisScore = analysisScore;
        this.calorie = calorie;
        this.protein = protein;
        this.fat = fat;
        this.carbohydrate = carbohydrate;
        this.sugar = sugar;
        this.dietaryFiber = dietaryFiber;
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

    /**
     * 엔티티 에너지 탄단지 수정
     */
    public AnalysisHistory updateScore(String analysisScore) {
        this.analysisScore = analysisScore;
        return this;
    }

    /**
     * 엔티티 에너지 탄단지 수정
     */
    public AnalysisHistory updateRecIntake(Float calorie, Float carbohydrate, Float protein, Float fat) {
        this.calorie = calorie;
        this.carbohydrate = carbohydrate;
        this.protein = protein;
        this.fat = fat;
        return this;
    }

    /**
     * 엔티티 당, 콜레스테롤, 포화지방, 트랜스지방 수정
     */
    public AnalysisHistory updateSugarFat(Float sugar, Float cholesterol, Float fattyAcid, Float transFattyAcid) {
        this.sugar = sugar;
        this.cholesterol = cholesterol;
        this.fattyAcid = fattyAcid;
        this.transFattyAcid = transFattyAcid;
        return this;
    }

    /**
     * 비타민 및 무기질 수정
     */
    public AnalysisHistory updateVitamin(Float dietaryFiber, Float calcium, Float iron, Float magnesium, Float phosphorus, Float potassium, Float sodium, Float zinc, Float copper, Float manganese, Float selenium, Float vitaminA, Float vitaminD, Float folate, Float vitaminB12, Float vitaminC, Float linoleicAcid, Float alphaLinoleicAcid, Float vitaminB1, Float vitaminB2) {
        this.dietaryFiber = dietaryFiber;
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
        this.folate = folate;
        this.vitaminB12 = vitaminB12;
        this.vitaminC = vitaminC;
        this.linoleicAcid = linoleicAcid;
        this.alphaLinoleicAcid = alphaLinoleicAcid;
        this.vitaminB1 = vitaminB1;
        this.vitaminB2 = vitaminB2;
        return this;
    }

}
