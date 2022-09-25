package planeat.api.controller;

/*
 *
 * MyDietController - 내 식단 API
 *
 @author 박윤하
 @since 2022-09-22
*/

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

