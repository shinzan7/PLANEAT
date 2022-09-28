//package planeat.api.service;
//
//import org.junit.jupiter.api.Test;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.boot.test.context.SpringBootTest;
//import planeat.api.dto.usernutrient.UserNutrientRequest;
//import planeat.api.dto.usernutrient.UserNutrientResponse;
//
//import javax.transaction.Transactional;
//
//import static org.junit.jupiter.api.Assertions.*;
//
//@SpringBootTest
//@Transactional
//class UserNutrientServiceTest {
//
//    @Autowired
//    UserNutrientService userNutrientService;
//
//    @Test
//    public void test1(){
//        UserNutrientRequest request = UserNutrientRequest.builder()
//                .userId(1L)
//                .nutrientId(2L)
//                .intakeRecommend(3)
//                .build();
//        userNutrientService.createUserNutrient(request);
//
//        UserNutrientResponse response = userNutrientService.readUserNutrientById(2L);
//        System.out.println("=======================");
//        System.out.println(response.getUserId() + " " + response.getNutrientName());
//        System.out.println("=======================");
//    }
//
//}