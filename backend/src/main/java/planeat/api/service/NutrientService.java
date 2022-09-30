package planeat.api.service;
/*
 *
 @author 신지한
 @since 2022-09-15
*/

import lombok.RequiredArgsConstructor;
import org.qlrm.mapper.JpaResultMapper;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import planeat.api.dto.nutrient.NutrientDto;
import planeat.api.dto.nutrient.NutrientRequest;
import planeat.api.dto.nutrient.NutrientResponse;
import planeat.api.dto.nutrient.NutrientSearchResponse;
import planeat.config.image.S3Uploader;
import planeat.database.entity.Category;
import planeat.database.entity.Ingredient;
import planeat.database.entity.Nutrient;
import planeat.database.entity.NutrientIngredient;
import planeat.database.repository.CategoryRepository;
import planeat.database.repository.IngredientRepository;
import planeat.database.repository.NutrientIngredientRespository;
import planeat.database.repository.NutrientRepository;
import planeat.exception.CustomException;
import planeat.exception.CustomExceptionList;

import javax.persistence.EntityManager;
import javax.persistence.Query;
import javax.transaction.Transactional;
import java.util.ArrayList;
import java.util.LinkedList;
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
    private final S3Uploader s3Uploader;
    private final EntityManager em;

    /**
     * 태그를 포함하는 영양제를 모두 검색
     * @param categoryTag 검색할 태그
     * @return 검색결과 영양제 dto 리스트
     */
    public List<NutrientSearchResponse> readAllNutrientByCategoryTag(String categoryTag){
        JpaResultMapper jpaResultMapper = new JpaResultMapper();
        String query = "select * from nutrient where nutrient_id in " +
                "(select nutrient_id from nutrient_ingredient where ingredient_id in " +
                "(select ingredient_id from category where category_tag like '"+ categoryTag +"'))";
        Query q = em.createNativeQuery(query);

        List<NutrientSearchResponse> responseList = jpaResultMapper.list(q, NutrientSearchResponse.class);
        return responseList;
    }

    /**
     * 영양성분을 포함하는 영양제를 모두 검색
     * @param ingredientId 검색할 영양성분 id
     * @return 검색결과 영양제 dto 리스트
     */
    public List<NutrientSearchResponse> readAllNutrientByIngredientId(Integer ingredientId){
        JpaResultMapper jpaResultMapper = new JpaResultMapper();
        String query = "select * from nutrient where nutrient_id in " +
                "(select nutrient_id from nutrient_ingredient where ingredient_id ="+ ingredientId + ")";
        Query q = em.createNativeQuery(query);

        List<NutrientSearchResponse> responseList = jpaResultMapper.list(q, NutrientSearchResponse.class);
        return responseList;
    }

    /**
     * 모든 영양제의 아이디와 이름 조회
     *
     * @return dto 리스트
     */
    public List<NutrientDto> readAllNutrientDto() {
        List<NutrientDto> dtoList = nutrientRepository.findAllName();
        return dtoList;
    }



    /**
     * nutrient객체를 받아 연관데이터를 response에 담아 반환한다
     * @param nutrient
     * @return 영양제관련 response Dto
     */
    private NutrientResponse takeAllTable(Nutrient nutrient){

        NutrientResponse nutrientResponse = new NutrientResponse();

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
            for (NutrientIngredient ni : nutrientIngredientList) {
                Ingredient ingredient = ingredientRepository.findById(ni.getIngredient().getId()).get();

                List<Category> categoryList = categoryRepository.findAllByIngredientId(ingredient.getId());
                List<String> tagList = new ArrayList<>();
                for (Category c : categoryList) {
                    tagList.add(c.getCategoryTag());
                }

                // responseList에 영양성분 이름, 영양성분 함량, 카테고리 list 넣어주기
                responseList.add(
                        new NutrientResponse.NutriIngredient(ingredient.getIngredientName(), ni.getIngredientAmount(), tagList)
                );

            }
            nutrientResponse.setNutriIngredientList(responseList);


        return nutrientResponse;
    }

    /**
     * 영양제와 연관테이블 조회
     *
     * @param id 조회할 영양제 id
     * @return 영양제 + 영양제 성분 + 영양성분 + 카테고리
     */
    public NutrientResponse readNutrientById(Long id) {
        Nutrient nutrient = nutrientRepository.findById(id).orElseThrow(
                () -> new CustomException(CustomExceptionList.FOODINFO_NOT_FOUND_ERROR)
        );

        return takeAllTable(nutrient);
    }

    public List<Nutrient> readAllNutrient(){
        List<Nutrient> nutrientList = nutrientRepository.findAllNutrient();

        return nutrientList;
    }

    /**
     * 영양제와 연관테이블 등록
     *
     * @param nutrientRequest 영양제 등록 요청 DTO
     * @return 등록된 영양제의 id
     */
    public void createNutrientAndIngredients(NutrientRequest nutrientRequest, MultipartFile multipartFile) {
        //이미지 업로드 후 경로 받아오기
        String imageUrl = null;
        if (multipartFile != null && !multipartFile.isEmpty()) {
            try {
                //imageUrl 사진경로
                imageUrl = s3Uploader.uploadFiles(multipartFile, "static");
            } catch (Exception e) {
                throw new CustomException(CustomExceptionList.UPLOAD_ERROR);
            }
        }

        //영양제
        Nutrient nutrient = Nutrient.builder()
                .nutrientName(nutrientRequest.getNutrientName())
                .company(nutrientRequest.getCompany())
                .description(nutrientRequest.getDescription())
                .imagePath(imageUrl)
                .build();

        List<NutrientRequest.NutriIngredient> ingredientList = nutrientRequest.getNutriIngredientList();

        for (NutrientRequest.NutriIngredient dto : ingredientList) {
            //영양성분
            Ingredient ingredient = Ingredient.builder()
                    .ingredientName(dto.getIngredientName())
                    .unit(dto.getUnit())
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
            for (String categoryTag : dto.getCategoryTagList()) {
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

