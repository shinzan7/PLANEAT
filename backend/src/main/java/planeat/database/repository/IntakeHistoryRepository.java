package planeat.database.repository;

/*
 *
 * IntakeHistoryRepository
 *
 @author 박윤하
 @since 2022-09-25
*/

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import planeat.database.entity.IntakeHistory;

import java.time.LocalDate;
import java.util.List;

public interface IntakeHistoryRepository extends JpaRepository<IntakeHistory, Long> {

    @Query("select i from IntakeHistory i where i.user.id = :userId and i.date = :date")
    List<IntakeHistory> findAllByIdAndDateIntakeHistory(@Param("userId") Long userId,@Param("date") LocalDate date);

}
