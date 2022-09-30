package planeat.database.repository;

/*
 *
 * NutritionRepository
 *
 @author 박윤하
 @since 2022-09-26
*/

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import planeat.database.entity.Nutrition;
import planeat.enums.Gender;

import java.util.List;

public interface NutritionRepository extends JpaRepository<Nutrition, Long> {

    @Query("select n from Nutrition n where n.gender = :gender and n.age_min <= :age and n.age_max >= :age")
    List<Nutrition> findAllByGenderAndAge(@Param("gender") Gender gender, @Param("age") Integer age);

}
