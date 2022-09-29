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
    String nutrientName;
    String company;
    String description;
    List<NutriIngredient> nutriIngredientList;

    @Getter @Setter
    public static class NutriIngredient{
        String ingredientName;
        String unit;
        Float ingredientAmount;
        List<String> categoryTagList;
    }

    @Builder
    public void createNutrientRequest(String nutrientName, String company, String description, List<NutriIngredient> nutriIngredientList) {
        this.nutrientName = nutrientName;
        this.company = company;
        this.description = description;
        this.nutriIngredientList = nutriIngredientList;
    }
}
