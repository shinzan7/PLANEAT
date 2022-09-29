package planeat.database.repository;
/*
 *
 @author 신지한
 @since 2022-09-15
*/
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import planeat.api.dto.nutrient.NutrientDto;
import planeat.database.entity.Nutrient;

import java.util.List;
import java.util.Optional;

public interface NutrientRepository extends JpaRepository<Nutrient, Long> {
    Optional<Nutrient> findById(Long id);
    List<Nutrient> findAllByNutrientNameContains(String searchWord);
    List<Nutrient> findAll();

//    @Query("select n from Nutrient n " +
//            "left join fetch n.nutrientIngredientList as ni " +
//            "left join fetch ni.ingredient as i " +
//            "left join fetch i.categoryList")
//@Query("select n from Nutrient n " +
//        "left join fetch n.nutrientIngredientList as ni " +
//        "left join fetch ni.ingredient as i ")
@Query("select distinct n from Nutrient n " +
        "left join fetch n.nutrientIngredientList")
    List<Nutrient> findAllNutrient();
}
