package planeat.api.dto.analysishistory;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.io.Serializable;

@Getter
@Setter
@NoArgsConstructor
public class AnalysisHistoryPercentResponse implements Serializable {
    private Integer analysisType;

    private Integer badCount;
    private Integer normalCount;
    private Integer goodCount;

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
    public AnalysisHistoryPercentResponse(Integer analysisType, Integer badCount, Integer normalCount, Integer goodCount, Float calorie, Float protein, Float fat, Float carbohydrate, Float sugar, Float dietaryFiber, Float calcium, Float iron, Float magnesium, Float phosphorus, Float potassium, Float sodium, Float zinc, Float copper, Float manganese, Float selenium, Float vitaminA, Float vitaminD, Float vitaminB6, Float folate, Float vitaminB12, Float vitaminC, Float cholesterol, Float fattyAcid, Float linoleicAcid, Float alphaLinoleicAcid, Float transFattyAcid, Float vitaminB1, Float vitaminB2) {
        this.analysisType = analysisType;
        this.badCount = badCount;
        this.normalCount = normalCount;
        this.goodCount = goodCount;
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

}