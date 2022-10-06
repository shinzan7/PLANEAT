package planeat.api.controller;

import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import planeat.api.dto.common.BasicResponse;
import planeat.api.dto.nutrient.NutrientDto;
import planeat.api.dto.nutrient.NutrientRequest;
import planeat.api.dto.nutrient.NutrientResponse;
import planeat.api.dto.nutrient.NutrientSearchResponse;
import planeat.api.service.NutrientService;
import planeat.api.service.UserNutrientService;
import planeat.database.repository.NutrientRepository;
import planeat.database.repository.UserNutrientRepository;

import java.util.List;

/*
 *
 * 영양제 데이터 API
 *
 @author 신지한
 @since 2022-09-15
*/
@RestController
@RequiredArgsConstructor
@Slf4j
@RequestMapping("/nutrient")
public class NutrientController {

    final NutrientService nutrientService;
    final NutrientRepository nutrientRepository;
    final UserNutrientService userNutrientService;
    final UserNutrientRepository userNutrientRepository;


    static final String SUCCESS = "success";

    @GetMapping("/tag/{categoryTag}")
    @ApiOperation(value = "영양제 카테고리 태그명으로 검색", notes = "영양제id, 영양제이름, 제조회사, 상세설명, 이미지경로를 반환한다")
    public ResponseEntity<BasicResponse<List<NutrientSearchResponse>>> readAllNutrientByCategoryTag(@PathVariable("categoryTag") String categoryTag) {
        List<NutrientSearchResponse> responseList = nutrientService.readAllNutrientByCategoryTag(categoryTag);
        return new ResponseEntity<>(makeBasicResponse(SUCCESS, responseList), HttpStatus.OK);
    }

    @GetMapping("/ingredient/{ingredientId}")
    @ApiOperation(value = "영양제 영양성분으로 검색", notes = "영양제id, 영양제이름, 제조회사, 상세설명, 이미지경로를 반환한다")
    public ResponseEntity<BasicResponse<List<NutrientSearchResponse>>> readAllNutrientByIngredientId(@PathVariable("ingredientId") Integer ingredientId) {
        List<NutrientSearchResponse> responseList = nutrientService.readAllNutrientByIngredientId(ingredientId);
        return new ResponseEntity<>(makeBasicResponse(SUCCESS, responseList), HttpStatus.OK);
    }

    @GetMapping("/all/name")
    @ApiOperation(value = "영양제 이름 전체조회", notes = "[영양제]테이블의 모든 영양제id, 영양제이름을 반환한다")
    public ResponseEntity<BasicResponse<List<NutrientDto>>> readAllNutrientIdAndName() {
        List<NutrientDto> dtoList = nutrientService.readAllNutrientDto();
        return new ResponseEntity<>(makeBasicResponse(SUCCESS, dtoList), HttpStatus.OK);
    }

    @GetMapping
    @ApiOperation(value = "영양제 조회", notes = "영양제 id를 받아 Table[영양제, 영양제 성분, 영양성분, 카테고리]을 조회한다")
    public ResponseEntity<BasicResponse<NutrientResponse>> readNutrient(@RequestParam Long id) {

        NutrientResponse nutrientResponse = nutrientService.readNutrientById(id);
        return new ResponseEntity<>(makeBasicResponse(SUCCESS, nutrientResponse), HttpStatus.OK);
    }

    @PostMapping
    @ApiOperation(value = "영양제 등록", notes = "영양제 정보를 받아 이미지를 업로드하고 Table[영양제, 영양제 성분, 영양성분, 카테고리]에 등록한다")
    public ResponseEntity<BasicResponse<String>> createNutrient(@RequestBody NutrientRequest nutrientRequest, MultipartFile image) {
        nutrientService.createNutrientAndIngredients(nutrientRequest, image);
        return new ResponseEntity<>(makeBasicResponse(SUCCESS, " "), HttpStatus.CREATED);
    }

    @PutMapping
    @ApiOperation(value = "영양제 이미지 수정", notes = "영양제 id와 수정할 이미지를 받아 이미지를 업로드하고 해당 url을 반환한다")
    public ResponseEntity<BasicResponse<String>> updateNutrientImage(@RequestParam Long nutrientId, MultipartFile image) {
        String imageUrl = nutrientService.updateNutrientImage(nutrientId, image);
        return new ResponseEntity<>(makeBasicResponse(SUCCESS, imageUrl), HttpStatus.CREATED);
    }

    @PutMapping("/word-cloud")
    @ApiOperation(value = "영양제 워드클라우드 이미지 등록", notes = "영양제 정보를 받아 이미지를 업로드하고 Table[영양제, 영양제 성분, 영양성분, 카테고리]에 등록한다")
    public ResponseEntity<BasicResponse<String>> uploadNutrientWordCloud(@RequestParam Long nutrientId, MultipartFile image) {
        String imageUrl = nutrientService.updateNutrientWordCloudImage(nutrientId, image);
        return new ResponseEntity<>(makeBasicResponse(SUCCESS, imageUrl), HttpStatus.CREATED);
    }

    @GetMapping("/name/{searchWord}")
    @ApiOperation(value = "영양제 이름검색", notes = "검색한 키워드를 포함하는 영양제 목록을 반환한다")
    public ResponseEntity<BasicResponse<List<NutrientSearchResponse>>> readAllNutrientByName(@PathVariable("searchWord") String searchWord) {
        List<NutrientSearchResponse> responseList = nutrientService.readAllNutrientBySearchKeyword(searchWord);
        return new ResponseEntity<>(makeBasicResponse(SUCCESS, responseList), HttpStatus.OK);
    }


    /**
     * 기본 Response 형식 DTO
     *
     * @param message 성공, 실패 여부 메세지 "SUCCESS", "ERROR"
     * @param data    반환할 데이터
     * @return ResponseEntity의 Body
     */
    private <T> BasicResponse<T> makeBasicResponse(String message, T data) {
        return BasicResponse.<T>builder()
                .message(message)
                .data(data)
                .build();
    }

}
