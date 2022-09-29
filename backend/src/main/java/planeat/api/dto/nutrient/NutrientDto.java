package planeat.api.dto.nutrient;

import lombok.Data;

import java.io.Serializable;

/**
 * A DTO for the {@link planeat.database.entity.Nutrient} entity
 */
@Data
public class NutrientDto implements Serializable {
    private final Long id;
    private final String nutrientName;
}