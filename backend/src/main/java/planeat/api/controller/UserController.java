package planeat.api.controller;

/*
 *
 * UserController
 *
 *
 @author 박윤하
 @since 2022-09-26
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
@Api(tags = {"유저 정보 API를 제공하는 Controller"})
public class UserController {

    final UserService userService;

    static final String SUCCESS = "success";


    @DeleteMapping("/{userId}")
    @ApiOperation(value = "유저 탈퇴", notes = "유저 Id를 받아 정보를 삭제한다")
    @ApiImplicitParam(name = "userId", value = "유저 정보를 삭제할 유저의 Id", required = true, dataTypeClass = Long.class)
    public ResponseEntity<BasicResponse<Long>> DeleteUserInfo(@PathVariable("userId") Long userId) {
        userService.deleteUserInfo(userId);
        return new ResponseEntity<>(makeBasicResponse(SUCCESS, userId), HttpStatus.CREATED);
    }

    /**
     * 유저 정보, 유저 권장 섭취량, 카테고리 등록
     *
     * @param userId          유저 번호
     * @param userInfoRequest 유저 정보가 담긴 Dto
     * @return SUCCCESS, userId, HttpStatus.CREATED(201)
     */
    @PostMapping("/{userId}")
    @ApiOperation(value = "유저 정보(관심 건강, 권장섭취량) 등록", notes = "유저 Id와 등록할 유저 정보를 받아 등록한다")
    @ApiImplicitParam(name = "userId", value = "유저 정보를 등록할 유저의 Id", required = true, dataTypeClass = Long.class)
    public ResponseEntity<BasicResponse<Long>> createUserInfo(@PathVariable("userId") Long userId, @RequestBody UserInfoRequest userInfoRequest) {
        Long id = userService.createUserInfo(userId, userInfoRequest);
        return new ResponseEntity<>(makeBasicResponse(SUCCESS, id), HttpStatus.CREATED);
    }

    /**
     * 가장 최근 날짜의 유저, 유저 권장 섭취량, 카테고리 조회
     *
     * @param userId 유저 번호
     * @return SUCCCESS, UserInfoResponse, HttpStatus.OK(200)
     */
    @GetMapping("/{userId}")
    @ApiOperation(value = "가장 최근 날짜의 유저 정보(관심 건강, 권장섭취량) 조회", notes = "유저 Id 정보를 받아 조회한다")
    @ApiImplicitParam(name = "userId", value = "유저 정보를 조회할 유저의 Id", required = true, dataTypeClass = Long.class)
    public ResponseEntity<BasicResponse<UserInfoResponse>> readUserInfo(@PathVariable("userId") Long userId) {
        UserInfoResponse response = userService.readInfoByUserId(userId);
        return new ResponseEntity<>(makeBasicResponse(SUCCESS, response), HttpStatus.OK);
    }

    /**
     * 특정 날짜의 유저, 유저 권장 섭취량, 카테고리 조회
     *
     * @param userId 유저 번호
     * @param date   조회할 날짜
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
    @ApiOperation(value = "유저 관심 건강 정보 조회", notes = "유저 Id 정보를 받아 유저의 관심 건강 목록을 조회한다")
    @ApiImplicitParam(name = "userId", value = "유저 관심 건강 정보를 조회할 유저의 Id", required = true, dataTypeClass = Long.class)
    public ResponseEntity<BasicResponse<List<String>>> readUserCategory(@PathVariable("userId") Long userId) {
        List<String> response = userService.readCategoriesByUserId(userId);
        return new ResponseEntity<>(makeBasicResponse(SUCCESS, response), HttpStatus.OK);
    }

    /**
     * 유저 권장 섭취량만 조회
     *
     * @param userId 유저 번호
     * @return SUCCCESS, UserInfoResponse, HttpStatus.OK(200)
     */
    @GetMapping("/rec-intake/{userId}/{date}")
    @ApiOperation(value = "유저 권장 섭취량 정보 조회", notes = "유저 Id 정보를 받아 유저의 권장 섭취량 목록을 조회한다")
    @ApiImplicitParams({
            @ApiImplicitParam(name = "userId", value = "유저 정보를 조회할 유저의 Id", required = true, dataTypeClass = Long.class),
            @ApiImplicitParam(name = "date", value = "유저 정보를 조회할 날짜", required = true, dataTypeClass = String.class)
    })
    public ResponseEntity<BasicResponse<UserRecIntakeResponse>> readUserRecIntake(@PathVariable("userId") Long userId, @PathVariable("date") String date) {
        LocalDate localDate = LocalDate.parse(date, DateTimeFormatter.ISO_DATE);
        UserRecIntakeResponse response = userService.readRecIntakesByUserIdAndDate(userId, localDate);
        return new ResponseEntity<>(makeBasicResponse(SUCCESS, response), HttpStatus.OK);
    }

    /**
     * 유저, 유저 권장 섭취량, 카테고리 수정
     *
     * @param userId          유저 번호
     * @param userInfoRequest 수정할 유저 정보가 담긴 Dto
     * @return SUCCCESS, userId, HttpStatus.CREATED(201)
     */
    @PutMapping("/{userId}")
    @ApiOperation(value = "유저 정보(관심 건강, 권장섭취량) 수정", notes = "유저 Id와 수정할 유저 정보를 받아 수정한다")
    @ApiImplicitParam(name = "userId", value = "유저 정보를 수정할 유저의 Id", required = true, dataTypeClass = Long.class)
    public ResponseEntity<BasicResponse<Long>> UpdateUserInfo(@PathVariable("userId") Long userId, @RequestBody UserInfoRequest userInfoRequest) {
        Long id = userService.updateUserInfo(userId, userInfoRequest);
        return new ResponseEntity<>(makeBasicResponse(SUCCESS, id), HttpStatus.CREATED);
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
