package planeat.database.repository;

import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import planeat.database.entity.UserNutrient;
import java.util.List;

public interface UserNutrientRepository extends JpaRepository<UserNutrient, Long> {
    @EntityGraph(attributePaths = {"nutrientHistoryList"}, type = EntityGraph.EntityGraphType.LOAD)
    List<UserNutrient> findByUser_Id(Long id);
}
