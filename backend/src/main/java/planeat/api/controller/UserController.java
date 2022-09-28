package planeat.api.controller;

/*
 *
 * UserController
 *
 *
 @author 박윤하
 @since 2022-09-26
*/

import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import planeat.api.dto.common.BasicResponse;
import planeat.api.dto.user.UserInfoRequest;
import planeat.api.dto.user.UserInfoResponse;
import planeat.api.dto.user.UserRecIntakeResponse;
import planeat.api.service.UserService;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.List;


@RestController
@RequiredArgsConstructor
@RequestMapping("/user-infos")
public class UserController {

    final UserService userService;

    static final String SUCCESS = "success";

    /**
     * 유저 정보, 유저 권장 섭취량, 카테고리 등록
     *
     * @param userId 유저 번호
     * @param userInfoRequest 유저 정보가 담긴 Dto
     * @return SUCCCESS, userId, HttpStatus.CREATED(201)
     */
    @PostMapping("/{userId}")
    public ResponseEntity<BasicResponse<Long>> createUserInfo(@PathVariable("userId") Long userId, @RequestBody UserInfoRequest userInfoRequest) {
        Long id = userService.createUserInfo(userId, userInfoRequest);
        return new ResponseEntity<>(makeBasicResponse(SUCCESS, id), HttpStatus.CREATED);
    }

    /**
     * 유저, 유저 권장 섭취량, 카테고리 조회
     *
     * @param userId 유저 번호
     * @param date 조회할 날짜
     * @return SUCCCESS, UserInfoResponse, HttpStatus.OK(200)
     */
    @GetMapping("/{userId}/{date}")
    public ResponseEntity<BasicResponse<UserInfoResponse>> readUserInfo(@PathVariable("userId") Long userId, @PathVariable("date") String date) {
        LocalDate localDate = LocalDate.parse(date, DateTimeFormatter.ISO_DATE);
        UserInfoResponse response = userService.readInfoByUserId(userId, localDate);
        return new ResponseEntity<>(makeBasicResponse(SUCCESS, response), HttpStatus.OK);
    }

    /**
     * 유저 카테고리 목록만 조회
     *
     * @param userId 유저 번호
     * @return SUCCCESS, UserInfoResponse, HttpStatus.OK(200)
     */
    // 유저 카테고리 목록만 조회
    @GetMapping("/categories/{userId}")
    public ResponseEntity<BasicResponse<List<String>>> readUserCategory(@PathVariable("userId") Long userId) {
        List<String> response = userService.readCategoriesByUserId(userId);
        return new ResponseEntity<>(makeBasicResponse(SUCCESS, response), HttpStatus.OK);
    }

    /**
     * 유저 권장 섭취량만 조회 - 필수 영양소 테이블 값도 조회해 와서 response에 넣어줘야 함
     *
     * @param userId 유저 번호
     * @return SUCCCESS, UserInfoResponse, HttpStatus.OK(200)
     */
    @GetMapping("/rec-intake/{userId}/{date}")
    public ResponseEntity<BasicResponse<UserRecIntakeResponse>> readUserRecIntake(@PathVariable("userId") Long userId, @PathVariable("date") String date) {
        LocalDate localDate = LocalDate.parse(date, DateTimeFormatter.ISO_DATE);
        UserRecIntakeResponse response = userService.readRecIntakesByUserIdAndDate(userId, localDate);
        return new ResponseEntity<>(makeBasicResponse(SUCCESS, response), HttpStatus.OK);
    }

    /**
     * 유저, 유저 권장 섭취량, 카테고리 수정
     *
     * @param userId 유저 번호
     * @param userInfoRequest 수정할 유저 정보가 담긴 Dto
     * @return SUCCCESS, userId, HttpStatus.CREATED(201)
     */
    @PutMapping("/{userId}")
    public ResponseEntity<BasicResponse<Long>> UpdateUserInfo(@PathVariable("userId") Long userId, @RequestBody UserInfoRequest userInfoRequest) {
        Long id = userService.updateUserInfo(userId, userInfoRequest);
        return new ResponseEntity<>(makeBasicResponse(SUCCESS, id), HttpStatus.CREATED);
    }


    // 유저 탈퇴
//    @DeleteMapping("/{userId}")
//    public ResponseEntity<BasicResponse<Long>> DeleteUserInfo(@PathVariable("userId") Long userId, @RequestBody UserInfoRequest userInfoRequest) {
//        Long id = userService.deleteUserInfo(userId, userInfoRequest);
//        return new ResponseEntity<>(makeBasicResponse(SUCCESS, id), HttpStatus.OK);
//    }


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
