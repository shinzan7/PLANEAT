package planeat.database.repository;
/*
 *
 @author 신지한
 @since 2022-09-15
*/
import org.springframework.data.jpa.repository.JpaRepository;
import planeat.database.entity.Nutrient;

import java.util.Optional;

public interface NutrientRepository extends JpaRepository<Nutrient, Long> {
    Optional<Nutrient> findById(Long id);
}
