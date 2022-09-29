package planeat.database.repository;

import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import planeat.database.entity.NutrientHistory;

import java.util.List;

public interface NutrientHistoryRepository extends JpaRepository<NutrientHistory, Long> {

    @EntityGraph(attributePaths = {"userNutrient"})
    @Query("select n from NutrientHistory n where n.userNutrient.id = :userNutrientId")
    List<NutrientHistory> findAllByUserNutrientId(@Param("userNutrientId") Long userNutrientId);

}
