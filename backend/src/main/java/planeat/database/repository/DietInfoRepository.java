package planeat.database.repository;

/*
 *
 * DietInfoRepository
 *
 @author 박윤하
 @since 2022-09-22
*/

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import planeat.database.entity.DietInfo;

import java.util.List;

public interface DietInfoRepository extends JpaRepository<DietInfo, Long> {

    @Query("select d from DietInfo d where d.myDiet.id = :id")
    List<DietInfo> findByMyDietId(Long id);

}
