package planeat.database.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import planeat.database.entity.AnalysisHistory;
import planeat.database.entity.User;

import java.time.LocalDate;
import java.util.List;

public interface AnalysisHistoryRepository extends JpaRepository<AnalysisHistory, Long> {
    List<AnalysisHistory> findByUserAndDateAfter(User user, LocalDate date);
}