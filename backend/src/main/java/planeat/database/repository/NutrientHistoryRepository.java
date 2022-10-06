package planeat.database.repository;

import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import planeat.database.entity.NutrientHistory;
import planeat.database.entity.User;
import planeat.database.entity.UserNutrient;

import java.time.LocalDate;
import java.util.List;

public interface NutrientHistoryRepository extends JpaRepository<NutrientHistory, Long> {

    @EntityGraph(attributePaths = {"userNutrient"})
    @Query("select n from NutrientHistory n where n.userNutrient.id = :userNutrientId")
    List<NutrientHistory> findAllByUserNutrientId(@Param("userNutrientId") Long userNutrientId);

    NutrientHistory findByIntakeDateAndUserNutrient(LocalDate intakeDate, UserNutrient userNutrient);

    NutrientHistory findByUserNutrientAndIntakeDate(UserNutrient userNutrient, LocalDate intakeDate);

    List<NutrientHistory> findByUserNutrient_UserAndIntakeDateAfterAndIntakeDateBefore(User user, LocalDate startDate, LocalDate endDate);

    List<NutrientHistory> deleteByUserNutrient_User_IdAndIntakeDate(Long id, LocalDate intakeDate);

}
