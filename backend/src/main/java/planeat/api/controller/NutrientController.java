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
import planeat.api.dto.usernutrient.NutrientHistoryRequest;
import planeat.api.dto.usernutrient.NutrientHistoryResponse;
import planeat.api.dto.usernutrient.UserNutrientRequest;
import planeat.api.dto.usernutrient.UserNutrientResponse;
import planeat.api.service.NutrientService;
import planeat.api.service.UserNutrientService;
import planeat.database.entity.Nutrient;
import planeat.database.entity.NutrientHistory;
import planeat.database.repository.NutrientRepository;
import planeat.database.repository.UserNutrientRepository;

import java.util.List;
import java.util.Optional;

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

    @GetMapping("/all/name")
    @ApiOperation(value = "영양제 이름 전체조회", notes = "[영양제]테이블의 모든 영양제id, 영양제이름을 반환한다")
    public ResponseEntity<BasicResponse<List<NutrientDto>>> readAllNutrientIdAndName(){
        List<NutrientDto> dtoList = nutrientService.readAllNutrientDto();
        return new ResponseEntity<>(makeBasicResponse(SUCCESS, dtoList), HttpStatus.OK);
    }

    @GetMapping("/all")
    @ApiOperation(value = "영양제 전체조회", notes = "모든 Table[영양제, 영양제 성분, 영양성분, 카테고리]을 조회한다")
    public ResponseEntity<BasicResponse<List<NutrientResponse>>> readAllNutrient(){
        List<NutrientResponse> nutrientList = nutrientService.readAllNutrient();
        return new ResponseEntity<>(makeBasicResponse(SUCCESS, nutrientList), HttpStatus.OK);
    }

    /**
     * 영양제 섭취기록을 등록한다
     * @param request 영양제 섭취기록 dto
     * @return
     */
    @PostMapping("/history/{nutrientHistoryId}")
    @ApiOperation(value = "영양제 섭취기록 등록", notes = "유저 영양제 정보를 받아 Table[유저 영양제]에 등록한다")
    public ResponseEntity<BasicResponse<String>> createNutrientHistory(NutrientHistoryRequest request){
        userNutrientService.createNutrientHistory(request);
        return new ResponseEntity<>(makeBasicResponse(SUCCESS , " "), HttpStatus.CREATED);
    }

    @PutMapping("/history/{nutrientHistoryId}")
    @ApiOperation(value = "영양제 섭취기록 수정", notes = "유저 영양제 정보를 받아 Table[유저 영양제]을 수정한다")
    public ResponseEntity<BasicResponse<String>> updateNutrientHistory(@PathVariable("nutrientHistoryId") Long nutrientHistoryId,NutrientHistoryRequest request){
        userNutrientService.updateNutrientHistory(nutrientHistoryId, request);
        return new ResponseEntity<>(makeBasicResponse(SUCCESS , " "), HttpStatus.OK);
    }

    @DeleteMapping("/history/{nutrientHistoryId}")
    @ApiOperation(value = "영양제 섭취기록 삭제", notes = "유저 영양제 id를 받아 Table[유저 영양제]에서 삭제한다")
    public ResponseEntity<BasicResponse<String>> deleteNutrientHistory(@PathVariable("nutrientHistoryId") Long nutrientHistoryId){
        userNutrientService.deleteNutrientHistory(nutrientHistoryId);
        return new ResponseEntity<>(makeBasicResponse(SUCCESS , " "), HttpStatus.OK);
    }

    @GetMapping("/user/list/{userId}")
    @ApiOperation(value = "유저의 영양제 목록 조회", notes = "유저 id를 받아 Table[유저 영양제, 영양제 섭취기록]을 조회한다")
    public ResponseEntity<BasicResponse<List<UserNutrientResponse>>> readUserNutrient(@PathVariable("userId") Long userId){
        List<UserNutrientResponse> userNutrientResponseList = userNutrientService.readAllUserNutrientByUserId(userId);

        return new ResponseEntity<>(makeBasicResponse(SUCCESS, userNutrientResponseList), HttpStatus.OK);
    }

    @PostMapping("/user/{userNutrientId}")
    @ApiOperation(value = "유저 영양제 등록", notes = "유저 영양제 정보를 받아 Table[유저 영양제]에 등록한다")
    public ResponseEntity<BasicResponse<String>> createUserNutrient(UserNutrientRequest userNutrientRequest){
        userNutrientService.createUserNutrient(userNutrientRequest);
        return new ResponseEntity<>(makeBasicResponse(SUCCESS , " "), HttpStatus.CREATED);
    }

    @PutMapping("/user/{userNutrientId}")
    @ApiOperation(value = "유저 영양제 수정", notes = "유저 영양제 정보를 받아 Table[유저 영양제]를 수정한다")
    public ResponseEntity<BasicResponse<Long>> updateUserNutrient(@PathVariable("userNutrientId") Long userNutrientId,UserNutrientRequest userNutrientRequest){
        userNutrientService.updateUserNutrient(userNutrientId,userNutrientRequest);
        return new ResponseEntity<>(makeBasicResponse(SUCCESS , userNutrientId), HttpStatus.OK);
    }

    @DeleteMapping("/user/{userNutrientId}")
    @ApiOperation(value = "유저 영양제 삭제", notes = "유저 영양제 id를 받아 Table[유저 영양제]에서 삭제한다")
    public ResponseEntity<BasicResponse<Long>> deleteUserNutrient(@PathVariable("userNutrientId") Long userNutrientId){
        userNutrientService.deleteUserNutrient(userNutrientId);
        return new ResponseEntity<>(makeBasicResponse(SUCCESS , userNutrientId), HttpStatus.OK);
    }


    @PostMapping("/user/history/{nutrientId}")
    @ApiOperation(value = "유저의 영양제 목록 조회", notes = "영양제 섭취기록 request를 받아 Table[영양제 섭취기록]에 등록한다")
    public ResponseEntity<BasicResponse<String>> createNutrientHistory(@PathVariable("nutrientId") Long nutrientId ,NutrientHistoryRequest request){
        userNutrientService.createNutrientHistory(request);
        return new ResponseEntity<>(makeBasicResponse(SUCCESS, " "), HttpStatus.CREATED);
    }


    @GetMapping
    @ApiOperation(value = "영양제 조회", notes = "영양제 id를 받아 Table[영양제, 영양제 성분, 영양성분, 카테고리]을 조회한다")
    public ResponseEntity<BasicResponse<NutrientResponse>> readNutrient(Long id){

        NutrientResponse nutrientResponse = nutrientService.readNutrientById(id);

        return new ResponseEntity<>(makeBasicResponse(SUCCESS , nutrientResponse), HttpStatus.OK);
    }


    @PostMapping
    @ApiOperation(value = "영양제 등록", notes = "영양제 정보를 받아 이미지를 업로드하고 Table[영양제, 영양제 성분, 영양성분, 카테고리]에 등록한다")
    public ResponseEntity<BasicResponse<String>> createNutrient(NutrientRequest nutrientRequest, MultipartFile multipartFile){
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
