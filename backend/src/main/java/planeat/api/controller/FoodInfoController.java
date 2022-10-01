package planeat.api.controller;

/*
 *
 * FoodInfoController - 음식 정보 API
 *
 @author 박윤하
 @since 2022-09-19
*/

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiImplicitParam;
import io.swagger.annotations.ApiImplicitParams;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import planeat.api.dto.common.BasicResponse;
import planeat.api.dto.foodinfo.FoodInfoRequest;
import planeat.api.dto.foodinfo.FoodInfoResponse;
import planeat.api.service.FoodInfoService;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/food-infos")
@Api(tags = {"식품 정보 API를 제공하는 Controller"})
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
    @ApiOperation(value = "식품 정보(내 음식) 등록", notes = "유저 Id와 등록할 식품 정보를 받아 등록한다")
    @ApiImplicitParam(name = "userId", value = "식품 정보를 등록할 유저의 Id", required = true, dataType = "long")
    public ResponseEntity<BasicResponse<Long>> CreateFoodInfo(@PathVariable("userId") Long userId, @RequestBody FoodInfoRequest foodInfoRequest) {
        Long id = foodInfoService.createFoodInfo(userId, foodInfoRequest);
        return new ResponseEntity<>(makeBasicResponse(SUCCESS, id), HttpStatus.CREATED);
    }


    /**
     * 유저가 등록한 식품 정보 조회 - 최대 100개
     *
     * @param userId 유저 번호
     * @return SUCCCESS, List<FoodInfoResponse>, HttpStatus.OK(200)
     */
    @GetMapping("/{userId}")
    @ApiOperation(value = "식품 정보(내 음식) 조회", notes = "유저 Id가 등록한 식품 정보 목록을 반환한다 - 최대 100개")
    @ApiImplicitParam(name = "userId", value = "식품 정보를 등록할 유저의 Id", required = true, dataType = "long")
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
    @ApiOperation(value = "식품 정보(내 음식) 이름으로 조회", notes = "입력된 이름 조건에 맞는 식품 정보 목록을 반환한다 - 최대 500개")
    @ApiImplicitParams({
            @ApiImplicitParam(name = "userId", value = "식품 정보를 조회할 유저의 Id", required = true, dataType = "long"),
            @ApiImplicitParam(name = "name", value = "식품 정보를 조회할 식품 이름(키워드)", required = true, dataType = "String")
    })
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
    @ApiOperation(value = "식품 정보(내 음식) 등록", notes = "유저 Id와 수정할 식품 정보를 받아 수정한다")
    @ApiImplicitParam(name = "userId", value = "식품 정보를 수정할 유저의 Id", required = true, dataType = "long")
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
    @ApiOperation(value = "식품 정보(내 음식) 삭제", notes = "유저 Id와 삭제할 식품 정보를 받아 삭제한다")
    @ApiImplicitParam(name = "userId", value = "식품 정보를 삭제할 유저의 Id", required = true, dataType = "long")
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