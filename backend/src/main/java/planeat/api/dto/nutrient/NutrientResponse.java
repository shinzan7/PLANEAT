package planeat.api.dto.nutrient;
/*
 *
 * NutrientRequest의 설명을 여기 작성한다.
 *
 @author 신지한
 @since 2022-09-21
*/
import lombok.*;
import planeat.database.entity.NutrientReview;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
public class NutrientResponse {
    Long nutrientId;
    String nutrientName;
    String company;
    String description;
    String imagePath;
    List<NutriIngredient> nutriIngredientList;
    List<NutrientReview> nutrientReviewList;

    @Getter @Setter
    @AllArgsConstructor
    public static class NutriIngredient{
        String ingredientName;
        Float ingredientAmount;
        List<String> categoryTagList;
    }

    @Getter @Setter
    @AllArgsConstructor
    public static class NutrientReview{
        String keyword;
        Integer count;
    }

    @Builder
    public NutrientResponse(Long nutrientId, String nutrientName, String company, String description, String imagePath, List<NutriIngredient> nutriIngredientList, List<NutrientReview> nutrientReviewList) {
        this.nutrientId = nutrientId;
        this.nutrientName = nutrientName;
        this.company = company;
        this.description = description;
        this.imagePath = imagePath;
        this.nutriIngredientList = nutriIngredientList;
        this.nutrientReviewList = nutrientReviewList;
    }
}
