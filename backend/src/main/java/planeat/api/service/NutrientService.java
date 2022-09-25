package planeat.api.service;
/*
 *
 @author 신지한
 @since 2022-09-15
*/
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import planeat.api.dto.nutrient.NutrientRequest;
import planeat.api.dto.nutrient.NutrientResponse;
import planeat.database.entity.Category;
import planeat.database.entity.Ingredient;
import planeat.database.entity.Nutrient;
import planeat.database.entity.NutrientIngredient;
import planeat.database.repository.CategoryRepository;
import planeat.database.repository.IngredientRepository;
import planeat.database.repository.NutrientIngredientRespository;
import planeat.database.repository.NutrientRepository;

import javax.transaction.Transactional;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@Transactional
@RequiredArgsConstructor
public class NutrientService {

    private final NutrientRepository nutrientRepository;
    private final IngredientRepository ingredientRepository;
    private final NutrientIngredientRespository nutrientIngredientRespository;
    private final CategoryRepository categoryRepository;


    /**
     * @param id 조회할 영양제 id
     * @return 영양제 + 영양제 성분 + 영양성분 + 카테고리
     */
    public NutrientResponse readNutrientById(Long id){
        Optional<Nutrient> nutrientOptional = nutrientRepository.findById(id);

        NutrientResponse nutrientResponse = new NutrientResponse();

        //영양제 존재하면
        if(nutrientOptional.isPresent()){
            Nutrient nutrient = nutrientOptional.get();
            //영양제 정보 response에 저장
            nutrientResponse = NutrientResponse.builder()
                    .nutrientId(nutrient.getId())
                    .nutrientName(nutrient.getNutrientName())
                    .company(nutrient.getCompany())
                    .description(nutrient.getDescription())
                    .imagePath(nutrient.getImagePath())
                    .build();

            //영양제id로 영양제 성분들 가져오기
            List<NutrientIngredient> nutrientIngredientList = nutrientIngredientRespository.findAllByNutrientId(nutrient.getId());

            // response에 추가할 list
            List<NutrientResponse.NutriIngredient> responseList = new ArrayList<>();

            //영양제 성분id로 영양성분 가져오기
            for (NutrientIngredient ni : nutrientIngredientList){
                Ingredient ingredient = ingredientRepository.findById(ni.getIngredient().getId()).get();

                List<Category> categoryList = categoryRepository.findAllByIngredientId(ingredient.getId());
                List<String> tagList = new ArrayList<>();
                for (Category c : categoryList){
                    tagList.add(c.getCategoryTag());
                }

                // responseList에 영양성분 이름, 영양성분 함량, 카테고리 list 넣어주기
                responseList.add(
                        new NutrientResponse.NutriIngredient(ingredient.getIngredientName(),ni.getIngredientAmount(),tagList)
                );

            }
            nutrientResponse.setNutriIngredientList(responseList);

        }

        return nutrientResponse;
    }

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
                    .nutrient(nutrient)
                    .ingredient(ingredient)
                    .build();
            nutrient.putNutrientIngredient(nutrientIngredient);
            nutrientIngredientRespository.save(nutrientIngredient);

            //카테고리
            for (String categoryTag : dto.getCategoryTagList()){
                Category category = Category.builder()
                        .categoryTag(categoryTag)
                        .ingredient(ingredient)
                        .build();
                ingredient.putCategory(category);
                categoryRepository.save(category);
            }
            ingredientRepository.save(ingredient);
        }

        nutrientRepository.save(nutrient);

    }

}

