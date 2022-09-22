package planeat.api.controller;

/*
 *
 * FoodInfoController - 음식 정보 API
 *
 @author 박윤하
 @since 2022-09-19
*/

import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import planeat.api.dto.common.BasicResponse;
import planeat.api.dto.foodInfo.FoodInfoRequest;
import planeat.api.dto.foodInfo.FoodInfoResponse;
import planeat.api.service.FoodInfoService;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/food-infos")
public class FoodInfoController {

    final FoodInfoService foodInfoService;
    static final String SUCCESS = "success";


    /**
     * 식품 정보 등록
     *
     * @param userId 유저 번호
     * @param foodInfoRequest 등록할 식품 정보가 담긴 Dto
     * @return SUCCCESS, userId, HttpStatus.CREATED(201)
     */
    @PostMapping("/{userId}")
    public ResponseEntity<BasicResponse<Long>> CreateFoodInfo(@PathVariable("userId") Long userId, @RequestBody FoodInfoRequest foodInfoRequest) {
        Long id = foodInfoService.createFoodInfo(userId, foodInfoRequest);
        return new ResponseEntity<>(makeBasicResponse(SUCCESS, id), HttpStatus.CREATED);
    }


    /**
     * 전체 식품 정보 조회 - 가나다 순 100개
     * food_user 칼럼의 값이 1(관리자 번호)와 일치하는 식품 리스트 반환
     *
     * @return SUCCCESS, List<FoodInfoResponse>, HttpStatus.OK(200)
     */
    @GetMapping("/all/{userId}")
    public ResponseEntity<BasicResponse<List<FoodInfoResponse>>> readAllFoodInfos(Long userId) {
        List<FoodInfoResponse> responses = foodInfoService.readAllFoodInfos(userId);
        return new ResponseEntity<>(makeBasicResponse(SUCCESS, responses), HttpStatus.OK);
    }


    /**
     * 특정 유저가 등록한 식품 정보 조회
     *
     * @param userId 유저 번호
     * @return SUCCCESS, List<FoodInfoResponse>, HttpStatus.OK(200)
     */
    @GetMapping("/{userId}")
    public ResponseEntity<BasicResponse<List<FoodInfoResponse>>> readUserFoodInfos(@PathVariable("userId") Long userId) {
        List<FoodInfoResponse> responses = foodInfoService.readFoodInfo(userId);
        return new ResponseEntity<>(makeBasicResponse(SUCCESS, responses), HttpStatus.OK);

    }

    /**
     * 이름으로 식품 정보 조회
     *
     * @param userId 유저 번호
     * @param name 식품 이름
     * @return SUCCCESS, List<FoodInfoResponse>, HttpStatus.OK(200)
     */
    @GetMapping("/{userId}/{name}")
    public ResponseEntity<BasicResponse<List<FoodInfoResponse>>> readNameFoodInfos(@PathVariable("userId") Long userId, @PathVariable("name") String name) {
        List<FoodInfoResponse> responses = foodInfoService.readByNameFoodInfo(userId, name);
        return new ResponseEntity<>(makeBasicResponse(SUCCESS, responses), HttpStatus.OK);

    }


    /**
     * 식품 정보 수정
     *
     * @param userId 유저 번호
     * @param foodInfoRequest 수정될 식품 정보가 담긴 DTO
     * @return SUCCCESS, userId, HttpStatus.CREATED(201)
     */
    @PutMapping("/{userId}")
    public ResponseEntity<BasicResponse<Long>> UpdateFoodInfo(@PathVariable("userId") Long userId, @RequestBody FoodInfoRequest foodInfoRequest) {
        Long id = foodInfoService.updateFoodInfo(userId, foodInfoRequest);
        return new ResponseEntity<>(makeBasicResponse(SUCCESS, id), HttpStatus.CREATED);

    }


    /**
     * 식품 정보 삭제
     *
     * @param userId 유저 번호
     * @param foodInfoRequest 삭제될 식품 정보가 담긴 DTO
     * @return SUCCCESS, userId, HttpStatus.CREATED(200)
     */
    @DeleteMapping("/{userId}")
    public ResponseEntity<BasicResponse<Long>> DeleteFoodInfo(@PathVariable("userId") Long userId, @RequestBody FoodInfoRequest foodInfoRequest) {
        Long id = foodInfoService.deleteFoodInfo(userId, foodInfoRequest);
        return new ResponseEntity<>(makeBasicResponse(SUCCESS, id), HttpStatus.OK);
    }


    /**
     * 기본 Response 형식 DTO
     *
     * @param message 메세지 ex) 성공 : "SUCCESS"
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