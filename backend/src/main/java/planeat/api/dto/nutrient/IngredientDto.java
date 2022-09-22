package planeat.api.dto.nutrient;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import planeat.database.entity.Category;
import planeat.database.entity.NutrientIngredient;

import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
public class IngredientDto {
    private Long id;
    private String ingredientName;
    List<NutrientIngredient> nutrientIngredientList = new ArrayList<>();
    List<Category> categoryList = new ArrayList<>();
}
