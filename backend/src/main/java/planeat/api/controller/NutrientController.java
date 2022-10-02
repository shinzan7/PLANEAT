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
import planeat.api.dto.usernutrient.*;
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
    public ResponseEntity<BasicResponse<List<NutrientSearchResponse>>> readAllNutrientByCategoryTag(@PathVariable("categoryTag") String categoryTag){
        List<NutrientSearchResponse> responseList = nutrientService.readAllNutrientByCategoryTag(categoryTag);
        return new ResponseEntity<>(makeBasicResponse(SUCCESS, responseList), HttpStatus.OK);
    }
    @GetMapping("/ingredient/{ingredientId}")
    @ApiOperation(value = "영양제 영양성분으로 검색", notes = "영양제id, 영양제이름, 제조회사, 상세설명, 이미지경로를 반환한다")
    public ResponseEntity<BasicResponse<List<NutrientSearchResponse>>> readAllNutrientByIngredientId(@PathVariable("ingredientId") Integer ingredientId){
        List<NutrientSearchResponse> responseList = nutrientService.readAllNutrientByIngredientId(ingredientId);
        return new ResponseEntity<>(makeBasicResponse(SUCCESS, responseList), HttpStatus.OK);
    }
    @GetMapping("/all/name")
    @ApiOperation(value = "영양제 이름 전체조회", notes = "[영양제]테이블의 모든 영양제id, 영양제이름을 반환한다")
    public ResponseEntity<BasicResponse<List<NutrientDto>>> readAllNutrientIdAndName(){
        List<NutrientDto> dtoList = nutrientService.readAllNutrientDto();
        return new ResponseEntity<>(makeBasicResponse(SUCCESS, dtoList), HttpStatus.OK);
    }

    //중복 /nutrient/user/history (프론트에서 사용중)
//    @PostMapping("/history")
//    @ApiOperation(value = "영양제 섭취기록 등록", notes = "유저 영양제 정보를 받아 Table[유저 영양제]에 등록한다. 등록된 id를 반환한다")
//    public ResponseEntity<BasicResponse<Long>> createUserNutrientHistory(@RequestBody NutrientHistoryRequest request){
//        Long nutrientHistoryId = userNutrientService.createNutrientHistory(request);
//        return new ResponseEntity<>(makeBasicResponse(SUCCESS , nutrientHistoryId), HttpStatus.CREATED);
//    }

    //등록 로직 해야함
    @PostMapping("/history/{userId}")
    @ApiOperation(value = "영양제 섭취기록 등록", notes = "영양제 섭취기록 request를 받아 Table[영양제 섭취기록]에 등록한다")
    public ResponseEntity<BasicResponse<Long>> createNutrientHistory(@PathVariable("userId") Long userId, @RequestBody NutrientHistoryRequest request){
        Long nutrientHistoryId = userNutrientService.createNutrientHistory(userId, request);
        return new ResponseEntity<>(makeBasicResponse(SUCCESS, nutrientHistoryId), HttpStatus.CREATED);
    }

    @GetMapping("/history/{userId}")
    @ApiOperation(value = "영양제 섭취기록 리스트 유저id & 날짜로 조회", notes = "유저id와 날짜를 받아 유저영양제id, 권장섭취횟수, 섭취날짜, 실제섭취횟수를 반환한다")
    public ResponseEntity<BasicResponse<List<NutrientHistoryDateResponse>>> readNutrientHistoryByDate(@PathVariable("userId") Long userId, @RequestParam String intakeDate){
        List<NutrientHistoryDateResponse> responseList = userNutrientService.readNutrientHistoryByDate(userId, intakeDate);
        return new ResponseEntity<>(makeBasicResponse(SUCCESS , responseList), HttpStatus.OK);
    }

    //등록과 수정에 pathvariable로 userid를 받게
    //수정 로직해야함
    @PutMapping("/history/{userId}")
    @ApiOperation(value = "영양제 섭취기록 수정", notes = "영양제 섭취기록 정보를 받아 Table[영양제 섭취기록]을 수정한다")
    public ResponseEntity<BasicResponse<List<String>>> updateNutrientHistory(@PathVariable("userId") Long userId, @RequestBody NutrientHistoryRequest request){
        List<String> list = userNutrientService.updateNutrientHistory(userId, request);
        return new ResponseEntity<>(makeBasicResponse(SUCCESS , list), HttpStatus.OK);
    }

    //삭제는 프론트에서 미사용
//    @DeleteMapping("/history/{nutrientHistoryId}")
//    @ApiOperation(value = "영양제 섭취기록 삭제", notes = "영양제 섭취기록 id를 받아 Table[영양제 섭취기록]에서 삭제한다")
//    public ResponseEntity<BasicResponse<String>> deleteNutrientHistory(@PathVariable("nutrientHistoryId") Long nutrientHistoryId){
//        userNutrientService.deleteNutrientHistory(nutrientHistoryId);
//        return new ResponseEntity<>(makeBasicResponse(SUCCESS , " "), HttpStatus.OK);
//    }

    @GetMapping("/user/list/{userId}")
    @ApiOperation(value = "유저의 영양제 목록 조회", notes = "유저 id를 받아 Table[유저 영양제, 영양제 섭취기록]을 조회한다")
    public ResponseEntity<BasicResponse<List<UserNutrientResponse>>> readUserNutrient(@PathVariable("userId") Long userId){
        List<UserNutrientResponse> userNutrientResponseList = userNutrientService.readAllUserNutrientByUserId(userId);

        return new ResponseEntity<>(makeBasicResponse(SUCCESS, userNutrientResponseList), HttpStatus.OK);
    }

    @PostMapping("/user")
    @ApiOperation(value = "유저 영양제 등록", notes = "유저 영양제 정보를 받아 Table[유저 영양제]에 등록한다")
    public ResponseEntity<BasicResponse<String>> createUserNutrient(@RequestBody UserNutrientRequest userNutrientRequest){
        userNutrientService.createUserNutrient(userNutrientRequest);
        return new ResponseEntity<>(makeBasicResponse(SUCCESS , " "), HttpStatus.CREATED);
    }

    @PutMapping("/user/{userNutrientId}")
    @ApiOperation(value = "유저 영양제 수정", notes = "유저 영양제 정보를 받아 Table[유저 영양제]를 수정한다")
    public ResponseEntity<BasicResponse<Long>> updateUserNutrient(@PathVariable("userNutrientId") Long userNutrientId,@RequestBody UserNutrientRequest userNutrientRequest){
        userNutrientService.updateUserNutrient(userNutrientId,userNutrientRequest);
        return new ResponseEntity<>(makeBasicResponse(SUCCESS , userNutrientId), HttpStatus.OK);
    }

    @DeleteMapping("/user/{userNutrientId}")
    @ApiOperation(value = "유저 영양제 삭제", notes = "유저 영양제 id를 받아 Table[유저 영양제]에서 삭제한다")
    public ResponseEntity<BasicResponse<Long>> deleteUserNutrient(@PathVariable("userNutrientId") Long userNutrientId){
        userNutrientService.deleteUserNutrient(userNutrientId);
        return new ResponseEntity<>(makeBasicResponse(SUCCESS , userNutrientId), HttpStatus.OK);
    }

    @GetMapping
    @ApiOperation(value = "영양제 조회", notes = "영양제 id를 받아 Table[영양제, 영양제 성분, 영양성분, 카테고리]을 조회한다")
    public ResponseEntity<BasicResponse<NutrientResponse>> readNutrient(Long id){

        NutrientResponse nutrientResponse = nutrientService.readNutrientById(id);
        return new ResponseEntity<>(makeBasicResponse(SUCCESS , nutrientResponse), HttpStatus.OK);
    }

    @PostMapping
    @ApiOperation(value = "영양제 등록", notes = "영양제 정보를 받아 이미지를 업로드하고 Table[영양제, 영양제 성분, 영양성분, 카테고리]에 등록한다")
    public ResponseEntity<BasicResponse<String>> createNutrient(@RequestBody NutrientRequest nutrientRequest, MultipartFile multipartFile){
        nutrientService.createNutrientAndIngredients(nutrientRequest, multipartFile);
        return new ResponseEntity<>(makeBasicResponse(SUCCESS , " "), HttpStatus.CREATED);
    }

    /**
     * 기본 Response 형식 DTO
     *
     * @param message 성공, 실패 여부 메세지 "SUCCESS", "ERROR"
     * @param data 반환할 데이터
     * @return ResponseEntity의 Body
     */
    private <T> BasicResponse<T> makeBasicResponse(String message, T data) {
        return BasicResponse.<T>builder()
                .message(message)
                .data(data)
                .build();
    }

}
