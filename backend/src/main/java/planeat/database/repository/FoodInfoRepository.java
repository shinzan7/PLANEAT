package planeat.database.repository;

/*
 *
 * FoodInfoRepository
 *
 @author 박윤하
 @since 2022-09-19
*/

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import planeat.database.entity.FoodInfo;

import java.util.List;

public interface FoodInfoRepository extends JpaRepository<FoodInfo, Long> {

    @Query("select f from FoodInfo f where f.foodUser = :userId or f.foodUser = 1")
    List<FoodInfo> findAllFoodInfo(Long userId);

    @Query("select f from FoodInfo f where f.foodUser = :userId")
    List<FoodInfo> findByUserIdFoodInfo(Long userId);

    @Query("select f from FoodInfo f where f.name like '%:name%' and f.foodUser = :userId or f.foodUser = 1")
    List<FoodInfo> findByNameAndUserIdFoodInfo(String name, Long userId);

}
