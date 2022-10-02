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
import org.springframework.data.repository.query.Param;
import planeat.database.entity.FoodInfo;

import java.util.List;
import java.util.Optional;

public interface FoodInfoRepository extends JpaRepository<FoodInfo, Long> {

    @Query("select f from FoodInfo f where f.foodUser = :userId or f.foodUser = 1 order by f.id asc")
    List<FoodInfo> findAllFoodInfo(@Param("userId") Long userId, Pageable pageable);

    @Query("select f from FoodInfo f where f.foodUser = :userId")
    List<FoodInfo> findByUserIdFoodInfo(@Param("userId") Long userId, Pageable pageable);

    @Query("select f from FoodInfo f where f.name like concat('%', :name, '%') and (f.foodUser = :userId or f.foodUser = 1)")
    List<FoodInfo> findByNameAndUserIdFoodInfo(@Param("name") String name,@Param("userId") Long userId, Pageable pageable);

    Optional<FoodInfo> findById(Long foodInfoId);
}
