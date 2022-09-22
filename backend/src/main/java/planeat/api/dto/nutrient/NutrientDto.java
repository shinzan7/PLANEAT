package planeat.api.dto.nutrient;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import planeat.database.entity.NutrientIngredient;

import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
public class NutrientDto {
    private Long id;

    private String nutrientName;
    private String company;
    private String description;
    private String imagePath;
    List<NutrientIngredient> nutrientIngredientList = new ArrayList<>();

}
