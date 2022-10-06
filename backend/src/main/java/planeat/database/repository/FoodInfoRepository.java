package planeat.database.repository;

/*
 *
 * FoodInfoRepository
 *
 @author 박윤하
 @since 2022-09-19
*/

import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import planeat.database.entity.FoodInfo;

import java.util.List;
import java.util.Optional;

public interface FoodInfoRepository extends JpaRepository<FoodInfo, Long> {

    Optional<FoodInfo> findById(Long foodInfoId);

    List<FoodInfo> findByFoodUser(Long foodUser, Pageable pageable);

    @Query("select f from FoodInfo f where f.name like concat('%', :name, '%') and (f.foodUser = :userId or f.foodUser = 1) order by length(f.name) asc")
    List<FoodInfo> findByNameAndFoodUser(String name, Long userId, Pageable pageable);

}
