//package planeat.database.repository;
//
//import org.junit.jupiter.api.Test;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.boot.test.context.SpringBootTest;
//import org.springframework.transaction.annotation.Transactional;
//import planeat.database.entity.NutrientIngredient;
//
//import java.util.List;
//import java.util.Optional;
//
//import static org.junit.jupiter.api.Assertions.*;
//
//@SpringBootTest
//@Transactional
//class NutrientIngredientRespositoryTest {
//    @Autowired
//    NutrientIngredientRespository nutrientIngredientRespository;
//
//    @Test
//    public void test1(){
//        Optional<NutrientIngredient> ni = nutrientIngredientRespository.findById(1L);
//        System.out.println(ni.get().getIngredientAmount());
//    }
//
//    @Test
//    public void testfindAllbyNutrientId(){
//        List<NutrientIngredient> allByNutrientId = nutrientIngredientRespository.findAllByNutrientId(5L);
//        System.out.println(allByNutrientId.get(0).getIngredientAmount());
//    }
//
//}