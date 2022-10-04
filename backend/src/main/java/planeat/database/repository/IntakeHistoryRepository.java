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
import planeat.database.entity.User;
import planeat.enums.MealType;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

public interface IntakeHistoryRepository extends JpaRepository<IntakeHistory, Long> {

    Optional<IntakeHistory> findByUserAndDateAndMealType(User user, LocalDate date, MealType mealType);

    @Query("select i from IntakeHistory i where i.user.id = :userId and i.date = :date")
    List<IntakeHistory> findAllByIdAndDateIntakeHistory(@Param("userId") Long userId,@Param("date") LocalDate date);

}
