package planeat.database.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import planeat.database.entity.AnalysisHistory;
import planeat.database.entity.User;

import java.time.LocalDate;
import java.util.List;

public interface AnalysisHistoryRepository extends JpaRepository<AnalysisHistory, Long> {

    List<AnalysisHistory> findByUser(User user);

    List<AnalysisHistory> findByUserAndDateAfter(User user, LocalDate date);

    List<AnalysisHistory> findByUserAndDate(User user, LocalDate date);

    @Query("select a from AnalysisHistory a where a.user.id = :userId and a.date = :date order by a.analysisType")
    List<AnalysisHistory> findByUserIdAndDate(@Param("userId") Long userId,@Param("date") LocalDate date);

}