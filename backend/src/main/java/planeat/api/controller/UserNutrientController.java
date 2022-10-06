package planeat.api.controller;

import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import planeat.api.dto.common.BasicResponse;
import planeat.api.dto.usernutrient.NutrientHistoryDateResponse;
import planeat.api.dto.usernutrient.NutrientHistoryRequest;
import planeat.api.dto.usernutrient.UserNutrientRequest;
import planeat.api.dto.usernutrient.UserNutrientResponse;
import planeat.api.service.NutrientService;
import planeat.api.service.UserNutrientService;
import planeat.database.repository.NutrientRepository;
import planeat.database.repository.UserNutrientRepository;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequiredArgsConstructor
@Slf4j
@RequestMapping("/nutrient")
public class UserNutrientController {
    final NutrientService nutrientService;
    final NutrientRepository nutrientRepository;
    final UserNutrientService userNutrientService;
    final UserNutrientRepository userNutrientRepository;


    static final String SUCCESS = "success";

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

    @PutMapping("/history/{userId}")
    @ApiOperation(value = "영양제 섭취기록 수정", notes = "영양제 섭취기록 정보를 받아 Table[영양제 섭취기록]을 수정한다")
    public ResponseEntity<BasicResponse<List<String>>> updateNutrientHistory(@PathVariable("userId") Long userId, @RequestBody NutrientHistoryRequest request){
        List<String> list = userNutrientService.updateNutrientHistory(userId, request);
        return new ResponseEntity<>(makeBasicResponse(SUCCESS , list), HttpStatus.OK);
    }

    @GetMapping("/user/list/{userId}")
    @ApiOperation(value = "유저의 영양제 목록 조회", notes = "유저 id를 받아 Table[유저 영양제, 영양제 섭취기록]을 조회한다")
    public ResponseEntity<BasicResponse<List<UserNutrientResponse>>> readUserNutrient(@PathVariable("userId") Long userId){
        List<UserNutrientResponse> userNutrientResponseList = userNutrientService.readAllUserNutrientByUserId(userId);

        return new ResponseEntity<>(makeBasicResponse(SUCCESS, userNutrientResponseList), HttpStatus.OK);
    }

    @GetMapping("/user/list/period")
    @ApiOperation(value = "유저의 영양제 목록 기간 조회", notes = "유저 id와 시작날짜(미포함), 종료날짜(미포함)를 받아 Table[유저 영양제, 영양제 섭취기록]을 조회한다")
    public ResponseEntity<BasicResponse<List<UserNutrientResponse>>> readUserNutrientByPeriod
            (@RequestParam("userId") Long userId, @RequestParam("startDate") String startDate, @RequestParam("endDate") String endDate){

        List<UserNutrientResponse> userNutrientResponseList = userNutrientService.
                readUserNutrientListByUserIdAndPeriod(userId, LocalDate.parse(startDate), LocalDate.parse(endDate));

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
