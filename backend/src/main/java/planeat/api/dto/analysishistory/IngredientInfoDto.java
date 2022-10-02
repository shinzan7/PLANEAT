package planeat.api.dto.analysishistory;

import lombok.Data;
import planeat.database.entity.FoodInfo;

import java.io.Serializable;

/**
 * 분석기록에 사용할 영양성분을 담는 dto
 */
@Data
public class IngredientInfoDto implements Serializable {
    private Float calorie = 0f;
    private Float protein = 0f;
    private Float fat = 0f;
    private Float carbohydrate = 0f;
    private Float sugar = 0f;

    private Float dietary_fiber = 0f;
    private Float calcium = 0f;
    private Float iron = 0f;
    private Float magnesium = 0f;
    private Float phosphorus = 0f;

    private Float potassium = 0f;
    private Float sodium = 0f;
    private Float zinc = 0f;
    private Float copper = 0f;
    private Float manganese = 0f;

    private Float selenium = 0f;
    private Float vitaminA = 0f;
    private Float vitaminD = 0f;
    private Float vitaminB6 = 0f;
    private Float folate = 0f;

    private Float vitaminB12 = 0f;
    private Float vitaminC = 0f;
    private Float cholesterol = 0f;
    private Float fattyAcid = 0f;
    private Float linoleicAcid = 0f;

    private Float alphaLinoleicAcid = 0f;
    private Float transFattyAcid = 0f;
    private Float vitaminB1 = 0f;
    private Float vitaminB2 = 0f;

    /**
     * 각 인덱스에 맞는 영양성분을 더한다
     * @param ingredientId 영양성분 번호id
     * @param ingredientAmount 영양성분 함량
     * @param intakeReal 실제섭취횟수
     */
    public void addIngredient(Integer ingredientId, Float ingredientAmount, Integer intakeReal){
        switch (ingredientId){
            case 1: this.calorie += ingredientAmount * intakeReal;
                    break;
            case 2: this.protein += ingredientAmount * intakeReal;
                break;
            case 3: this.fat += ingredientAmount * intakeReal;
                break;
            case 4: this.carbohydrate += ingredientAmount * intakeReal;
                break;
            case 5: this.sugar += ingredientAmount * intakeReal;
                break;

            case 6: this.dietary_fiber += ingredientAmount * intakeReal;
                break;
            case 7: this.calcium += ingredientAmount * intakeReal;
                break;
            case 8: this.iron += ingredientAmount * intakeReal;
                break;
            case 9: this.magnesium += ingredientAmount * intakeReal;
                break;
            case 10: this.phosphorus += ingredientAmount * intakeReal;
                break;

            case 11: this.potassium += ingredientAmount * intakeReal;
                break;
            case 12: this.sodium += ingredientAmount * intakeReal;
                break;
            case 13: this.zinc += ingredientAmount * intakeReal;
                break;
            case 14: this.copper += ingredientAmount * intakeReal;
                break;
            case 15: this.manganese += ingredientAmount * intakeReal;
                break;

            case 16: this.selenium += ingredientAmount * intakeReal;
                break;
            case 17: this.vitaminA += ingredientAmount * intakeReal;
                break;
            case 18: this.vitaminD += ingredientAmount * intakeReal;
                break;
            case 19: this.vitaminB6 += ingredientAmount * intakeReal;
                break;
            case 20: this.folate += ingredientAmount * intakeReal;
                break;

            case 21: this.vitaminB12 += ingredientAmount * intakeReal;
                break;
            case 22: this.vitaminC += ingredientAmount * intakeReal;
                break;
            case 23: this.cholesterol += ingredientAmount * intakeReal;
                break;
            case 24: this.fattyAcid += ingredientAmount * intakeReal;
                break;
            case 25: this.linoleicAcid += ingredientAmount * intakeReal;
                break;

            case 26: this.alphaLinoleicAcid += ingredientAmount * intakeReal;
                break;
            case 27: this.transFattyAcid += ingredientAmount * intakeReal;
                break;
            case 28: this.vitaminB1 += ingredientAmount * intakeReal;
                break;
            case 29: this.vitaminB2 += ingredientAmount * intakeReal;
                break;
            default: break;
        }
    }
}