package planeat.database.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import planeat.database.entity.Ingredient;

public interface IngredientRepository extends JpaRepository<Ingredient, Integer> {
}
