package planeat.api.controller;

/*
 *
 * MyDietController - 내 식단 API
 *
 @author 박윤하
 @since 2022-09-22
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
import planeat.api.dto.mydiet.MyDietRequest;
import planeat.api.dto.mydiet.MyDietResponse;
import planeat.api.service.MyDietService;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/my-diets")
@Api(tags = {"내 식단 API를 제공하는 Controller"})
public class MyDietController {

    final MyDietService myDietService;
    static final String SUCCESS = "success";


    /**
     * 내 식단 등록
     *
     * @param userId 유저 번호
     * @param myDietRequest 등록할 식품 정보가 담긴 Dto
     * @return SUCCCESS, userId, HttpStatus.CREATED(201)
     */
    @PostMapping("/{userId}")
    @ApiOperation(value = "내 식단 등록", notes = "유저 Id와 등록할 식단 정보를 받아 등록한다")
    @ApiImplicitParam(name = "userId", value = "내 식단 정보를 등록할 유저의 Id", required = true, dataTypeClass = Long.class)
    public ResponseEntity<BasicResponse<Long>> CreateMyDiet(@PathVariable("userId") Long userId, @RequestBody MyDietRequest myDietRequest) {
        Long id = myDietService.createMyDiet(userId, myDietRequest);
        return new ResponseEntity<>(makeBasicResponse(SUCCESS, id), HttpStatus.CREATED);
    }


    /**
     * 내 식단 정보 조회
     *
     * @param userId 유저 번호
     * @return SUCCCESS, List<MyDietResponse>, HttpStatus.OK(200)
     */
    @GetMapping("/{userId}")
    @ApiOperation(value = "내 식단 조회", notes = "유저 Id와 조회할 내 식단 정보를 받아 조회한다")
    @ApiImplicitParam(name = "userId", value = "내 식단 정보를 조회할 유저의 Id", required = true, dataTypeClass = Long.class)
    public ResponseEntity<BasicResponse<List<MyDietResponse>>> readMyDiets(@PathVariable("userId") Long userId) {
        List<MyDietResponse> responses = myDietService.readAllMyDiets(userId);
        return new ResponseEntity<>(makeBasicResponse(SUCCESS, responses), HttpStatus.OK);

    }

    /**
     * 이름으로 내 식단 조회
     *
     * @param userId 유저 번호
     * @param dietName   내 식단 이름
     * @return SUCCCESS, List<MyDietResponse>, HttpStatus.OK(200)
     */
    @GetMapping("/{userId}/{dietName}")
    @ApiOperation(value = "내 식단 이름으로 조회", notes = "입력된 이름 조건에 맞는 내 식단 정보 목록을 반환한다")
    @ApiImplicitParams({
            @ApiImplicitParam(name = "userId", value = "내 식단 정보를 조회할 유저의 Id", required = true, dataTypeClass = Long.class),
            @ApiImplicitParam(name = "dietName", value = "내 식단 정보를 조회할 내 식단 이름(키워드)", required = true, dataTypeClass = String.class)
    })
    public ResponseEntity<BasicResponse<List<MyDietResponse>>> readNameMyDiets(@PathVariable("userId") Long userId, @PathVariable("dietName") String dietName) {
        List<MyDietResponse> responses = myDietService.readByNameMyDiet(userId, dietName);
        return new ResponseEntity<>(makeBasicResponse(SUCCESS, responses), HttpStatus.OK);

    }


    /**
     * 내 식단 수정
     *
     * @param userId 유저 번호
     * @param myDietRequest 수정될 식품 정보가 담긴 DTO
     * @return SUCCCESS, userId, HttpStatus.CREATED(201)
     */
    @PutMapping("/{userId}")
    @ApiOperation(value = "내 식단 수정", notes = "유저 Id와 수정할 내 식단 정보를 받아 수정한다")
    @ApiImplicitParam(name = "userId", value = "내 식단 정보를 수정할 유저의 Id", required = true, dataTypeClass = Long.class)
    public ResponseEntity<BasicResponse<Long>> UpdateMyDiet(@PathVariable("userId") Long userId, @RequestBody MyDietRequest myDietRequest) {
        Long id = myDietService.updateMyDiet(userId, myDietRequest);
        return new ResponseEntity<>(makeBasicResponse(SUCCESS, id), HttpStatus.CREATED);

    }


    /**
     * 내 식단 삭제
     *
     * @param userId 유저 번호
     * @return SUCCCESS, userId, HttpStatus.CREATED(200)
     */
    @DeleteMapping("/{userId}")
    @ApiOperation(value = "내 식단 삭제", notes = "유저 Id와 삭제할 내 식단 정보를 받아 삭제한다")
    @ApiImplicitParam(name = "userId", value = "내 식단 정보를 삭제할 유저의 Id", required = true, dataTypeClass = Long.class)
    public ResponseEntity<BasicResponse<Long>> DeleteMyDiet(@PathVariable("userId") Long userId, @RequestBody MyDietRequest myDietRequest) {
        Long id = myDietService.deleteMyDiet(userId, myDietRequest);
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

