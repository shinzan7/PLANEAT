package planeat.database.repository;

import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import planeat.database.entity.NutrientIngredient;

import java.util.List;
import java.util.Optional;

public interface NutrientIngredientRespository extends JpaRepository<NutrientIngredient, Long> {
    Optional<NutrientIngredient> findById(Long id);

    @EntityGraph(attributePaths = {"nutrient", "ingredient"})
    @Query("select n from NutrientIngredient n where n.nutrient.id = :nutrientId")
    List<NutrientIngredient> findAllByNutrientId(@Param("nutrientId") Long nutrientId);
}
