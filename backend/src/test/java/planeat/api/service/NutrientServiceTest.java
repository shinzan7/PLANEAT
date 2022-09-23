package planeat.api.service;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import planeat.api.dto.nutrient.NutrientRequest;
import planeat.api.dto.nutrient.NutrientResponse;

import javax.transaction.Transactional;

import java.util.ArrayList;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
class NutrientServiceTest {

    @Autowired
    NutrientService nutrientService;

    @Test
    public void readTest(){
        NutrientResponse nutrientResponse = nutrientService.readNutrientById(5L);
        System.out.println(nutrientResponse.getNutrientName());
        System.out.println(nutrientResponse.getNutriIngredientList());
    }

    @Test
    public void saveTest(){
        NutrientRequest nutrientRequest = new NutrientRequest();
        List<NutrientRequest.NutriIngredient> nutriIngredientList = new ArrayList<>();
        NutrientRequest.NutriIngredient omega = new NutrientRequest.NutriIngredient();

        List<String> omegaList = new ArrayList<>();
        omegaList.add("눈에조와용");
        omegaList.add("머리도 조와");

        omega.setIngredientName("오메가3");
        omega.setIngredientAmount(30.1f);
        omega.setCategoryTagList(omegaList);

        nutriIngredientList.add(omega);

        nutrientRequest.createNutrientRequest("나우푸드 오메가3", "나우푸드", "하루에 2번 먹어용", "omega_image1.jpg", nutriIngredientList);

        nutrientService.createNutrientAndIngredients(nutrientRequest);

    }

}