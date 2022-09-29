//package planeat.database.repository;
//
//
//import org.assertj.core.api.Assertions;
//import org.junit.jupiter.api.Test;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.boot.test.context.SpringBootTest;
//import planeat.database.entity.Nutrient;
//
//import javax.transaction.Transactional;
//import java.util.List;
//
//
//@SpringBootTest
////@Transactional
//class NutrientRepositoryTest {
//    @Autowired
//    private NutrientRepository nutrientRepository;
//
////    @Test
////    void getTest(){
////        List<Nutrient> allNutrient = nutrientRepository.findAllNutrient();
////        for (int i=0; i<allNutrient.size(); i++){
////            Nutrient nutrient = allNutrient.get(i);
////            System.out.println(i + "번 영양제================");
////            System.out.println(nutrient.getNutrientName());
////
////            System.out.println(nutrient.getNutrientIngredientList().get(0).getIngredientAmount());
////            System.out.println(nutrient.getNutrientIngredientList().get(0).getIngredient().getIngredientName());
////            System.out.println(nutrient.getNutrientIngredientList().get(0).getIngredient().getCategoryList().get(0).getCategoryTag());
////
////        }
////    }
//
////    @Test
////    void getTest1(){
////
////        for (long i=4L; i<15L; i++){
////            Nutrient nutrient1 = new Nutrient(i, "나우푸드 비타민A", "나우푸드", "눈 건강에 조와용", "image1.png");
////            nutrientRepository.save(nutrient1);
////        }
////
////
////    }
//}