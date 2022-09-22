package planeat.api.dto.nutrient;
/*
 *
 * NutrientRequest의 설명을 여기 작성한다.
 *
 @author 신지한
 @since 2022-09-21
*/
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.experimental.SuperBuilder;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
public class NutrientRequest {
    Long nutrientId;
    String nutrientName;
    String company;
    String description;
    String imagePath;
    List<NutriIngredient> nutriIngredientList;

    @Getter @Setter
    public static class NutriIngredient{
        String ingredientName;
        Float ingredientAmount;
        List<String> categoryTagList;
    }

    @Builder
    public void createNutrientRequest(Long nutrientId, String nutrientName, String company, String description, String imagePath, List<NutriIngredient> nutriIngredientList) {
        this.nutrientId = nutrientId;
        this.nutrientName = nutrientName;
        this.company = company;
        this.description = description;
        this.imagePath = imagePath;
        this.nutriIngredientList = nutriIngredientList;
    }
}
