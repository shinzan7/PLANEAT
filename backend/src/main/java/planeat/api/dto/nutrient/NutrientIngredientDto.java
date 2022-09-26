package planeat.api.dto.nutrient;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import planeat.database.entity.Ingredient;
import planeat.database.entity.Nutrient;

@Getter
@Setter
@NoArgsConstructor
public class NutrientIngredientDto {
    private Long id;
    private Nutrient nutrient;
    private Ingredient ingredient;
    private Float ingredientAmount;
}
