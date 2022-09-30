package planeat.database.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import planeat.database.entity.AnalysisHistory;
import planeat.database.entity.User;

import java.time.LocalDate;
import java.util.List;

public interface AnalysisHistoryRepository extends JpaRepository<AnalysisHistory, Long> {
    @Query("select a from AnalysisHistory a where a.user.id = :userId and a.date = :date order by a.analysis_type")
    List<AnalysisHistory> findByUserIdAndDate(@Param("userId") Long userId,@Param("date") LocalDate date);

}