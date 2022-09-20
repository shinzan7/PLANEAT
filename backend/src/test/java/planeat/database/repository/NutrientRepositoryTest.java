package planeat.database.repository;


import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import planeat.database.entity.Nutrient;


@SpringBootTest
class NutrientRepositoryTest {
    @Autowired
    private NutrientRepository nutrientRepository;

    @Test
    void getTest(){
        Nutrient nutrient = new Nutrient(1L, "비타민A", "하평회사", "하평이의 비타민");
        Nutrient saveNutrient = nutrientRepository.save(nutrient);

        Nutrient findNutrient = nutrientRepository.findById(saveNutrient.getId()).get();

        Assertions.assertThat(findNutrient.getId()).isEqualTo(nutrient.getId());

    }
}