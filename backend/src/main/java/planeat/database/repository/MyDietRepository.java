package planeat.database.repository;

/*
 *
 * MyDietRepository
 *
 @author 박윤하
 @since 2022-09-21
*/

import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import planeat.database.entity.MyDiet;

import java.util.List;

public interface MyDietRepository extends JpaRepository<MyDiet, Long> {

    @Query("select m from MyDiet m where m.user.id = :userId")
    List<MyDiet> findAllMyDiet(Long userId);


    @Query("select m from MyDiet m where m.dietName like concat('%', :dietName, '%') and m.user.id = :userId")
    List<MyDiet> findByUserIdAndDietName(Long userId, String dietName);

}