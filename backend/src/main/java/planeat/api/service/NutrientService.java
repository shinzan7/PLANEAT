package planeat.api.service;
/*
 *
 @author 신지한
 @since 2022-09-15
*/
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import planeat.api.dto.nutrient.NutrientIngredientDto;
import planeat.api.dto.nutrient.NutrientRequest;
import planeat.database.entity.Category;
import planeat.database.entity.Ingredient;
import planeat.database.entity.Nutrient;
import planeat.database.entity.NutrientIngredient;
import planeat.database.repository.NutrientRepository;

import javax.transaction.Transactional;
import java.util.ArrayList;
import java.util.List;

@Service
@Transactional
@RequiredArgsConstructor
public class NutrientService {

    private final NutrientRepository nutrientRepository;


    /**
     * @param nutrientRequest 영양제 등록 요청 DTO
     * @return 등록된 영양제의 id
     */
    public void createNutrientAndIngredients(NutrientRequest nutrientRequest){
        //영양제
        Nutrient nutrient = Nutrient.builder()
                .nutrientName(nutrientRequest.getNutrientName())
                .company(nutrientRequest.getCompany())
                .description(nutrientRequest.getDescription())
                .imagePath(nutrientRequest.getImagePath())
                .build();

        List<NutrientRequest.NutriIngredient> ingredientList = nutrientRequest.getNutriIngredientList();

        for (NutrientRequest.NutriIngredient dto : ingredientList){
            //영양성분
            Ingredient ingredient = Ingredient.builder()
                    .ingredientName(dto.getIngredientName())
                    .build();

            //영양제 성분
            NutrientIngredient nutrientIngredient = NutrientIngredient.builder()
                    .ingredientAmount(dto.getIngredientAmount())
                    .build();
            nutrient.putNutrientIngredient(nutrientIngredient);

            //카테고리
            for (String categoryTag : dto.getCategoryTagList()){
                Category category = Category.builder()
                        .categoryTag(categoryTag)
                        .build();
                ingredient.putCategory(category);
            }
        }

        nutrientRepository.save(nutrient);

    }

}

