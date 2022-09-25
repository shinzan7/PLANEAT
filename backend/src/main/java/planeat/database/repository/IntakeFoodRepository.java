package planeat.database.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import planeat.database.entity.IntakeFood;

import java.util.List;

public interface IntakeFoodRepository extends JpaRepository<IntakeFood, Long> {

    @Query("select i from IntakeFood i where i.intakeHistory.id = :id")
    List<IntakeFood> findByIntakeHistoryId(Long id);

}
