package planeat.database.repository;


import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import planeat.database.entity.Nutrient;

import javax.transaction.Transactional;
import java.util.List;


@SpringBootTest
@Transactional
class NutrientRepositoryTest {
    @Autowired
    private NutrientRepository nutrientRepository;

    @Test
    void getTest(){
//        Nutrient nutrient1 = new Nutrient(1L, "나우푸드 비타민A", "나우푸드", "눈 건강에 조와용", "image1.png");
//        Nutrient nutrient2 = new Nutrient(2L, "라이프익스텐션 멀티비타민", "라이프", "여러 비타민을 포함합니다", "image2.jpg");
//        Nutrient saveNutrient1 = nutrientRepository.save(nutrient1);
//        Nutrient saveNutrient2 = nutrientRepository.save(nutrient2);
//
//        Nutrient findNutrient = nutrientRepository.findById(saveNutrient1.getId()).get();
//        System.out.println(saveNutrient1);
//
//        List<Nutrient> nutrients = nutrientRepository.findAllByNutrientNameContains("나우푸드");
//        System.out.println("하위요");
//        System.out.println(nutrients.get(0).getNutrientName());
//
//        Assertions.assertThat(findNutrient.getId()).isEqualTo(nutrient1.getId());

    }
}