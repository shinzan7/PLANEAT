package planeat.database.repository;
/*
 *
 @author 신지한
 @since 2022-09-15
*/

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import planeat.api.dto.nutrient.NutrientDto;
import planeat.api.dto.nutrient.NutrientSearchResponse;
import planeat.database.entity.Nutrient;

import java.util.List;
import java.util.Optional;

public interface NutrientRepository extends JpaRepository<Nutrient, Long> {
    Optional<Nutrient> findById(Long id);
    List<Nutrient> findAll();

    @Query("select new planeat.api.dto.nutrient.NutrientDto(n.id, n.nutrientName) from Nutrient n")
    List<NutrientDto> findAllName();

    @Query(value = "select * from nutrient where nutrient_id in " +
            "(select nutrient_id from user_nutrient where user_nutrient_id = :userNutrientId)"
            , nativeQuery = true)
    Nutrient findNutrientByUserNutrientId(@Param("userNutrientId") Long userNutrientId);
}
