package planeat.api.dto.nutrient;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import planeat.database.entity.Ingredient;

@Getter
@Setter
@NoArgsConstructor
public class CategoryDto {
    private Long id;
    private Ingredient ingredient;
    private String categoryTag;
}
