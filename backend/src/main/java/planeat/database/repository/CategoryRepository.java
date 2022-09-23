package planeat.database.repository;

import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import planeat.database.entity.Category;

import java.util.List;

public interface CategoryRepository extends JpaRepository<Category, Long> {
    @EntityGraph(attributePaths = {"ingredient"})
    @Query("select c from Category c where c.ingredient.id = :ingredientId")
    List<Category> findAllByIngredientId(@Param("ingredientId") Integer ingredientId);
}
