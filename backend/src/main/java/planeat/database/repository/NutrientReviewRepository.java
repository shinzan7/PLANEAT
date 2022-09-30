package planeat.database.repository;

import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import planeat.database.entity.Nutrient;
import planeat.database.entity.NutrientReview;

import java.util.List;

public interface NutrientReviewRepository extends JpaRepository<NutrientReview, Long> {

    List<NutrientReview> findByNutrient(Nutrient nutrient);

}
