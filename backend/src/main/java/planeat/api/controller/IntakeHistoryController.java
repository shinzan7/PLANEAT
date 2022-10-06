package planeat.api.controller;

/*
 *
 * IntakeHistoryController - 섭취 기록 API
 *
 @author 박윤하
 @since 2022-09-25
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
import planeat.api.dto.intakehistory.IntakeHistoryRequest;
import planeat.api.dto.intakehistory.IntakeHistoryResponse;
import planeat.api.service.IntakeHistoryService;

import java.text.ParseException;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/intake-histories")
@Api(tags = {"섭취 기록 API를 제공하는 Controller"})
public class IntakeHistoryController {

    final IntakeHistoryService intakeHistoryService;

    static final String SUCCESS = "success";

    /**
     * 섭취 기록 등록
     *
     * @param userId               유저 번호
     * @param intakeHistoryRequest 등록할 섭취 기록 정보가 담긴 Dto
     * @return SUCCCESS, userId, HttpStatus.CREATED(201)
     */
    @PostMapping("/{userId}")
    @ApiOperation(value = "섭취 기록 등록", notes = "유저 Id와 등록할 섭취 기록을 받아 등록한다")
    @ApiImplicitParam(name = "userId", value = "섭취 기록 정보를 등록할 유저의 Id", required = true, dataTypeClass = Long.class)
    public ResponseEntity<BasicResponse<Long>> createIntakeHistory(@PathVariable("userId") Long userId, @RequestBody IntakeHistoryRequest intakeHistoryRequest) {
        Long id = intakeHistoryService.createIntakeHistory(userId, intakeHistoryRequest);
        return new ResponseEntity<>(makeBasicResponse(SUCCESS, id), HttpStatus.CREATED);
    }


    /**
     * 날짜별 섭취 기록 정보 조회
     *
     * @param userId 유저 번호
     * @param date   조회할 날짜
     * @return SUCCCESS, List<MyDietResponse>, HttpStatus.OK(200)
     */
    @GetMapping("/{userId}/{date}")
    @ApiOperation(value = "섭취 기록 날짜로 조회", notes = "입력된 날짜 조건에 맞는 섭취 기록 정보 목록을 반환한다")
    @ApiImplicitParams({
            @ApiImplicitParam(name = "userId", value = "섭취 기록 정보를 조회할 유저의 Id", required = true, dataTypeClass = Long.class),
            @ApiImplicitParam(name = "date", value = "섭취 기록 정보를 조회할 섭취 기록 날짜(키워드)", required = true, dataTypeClass = String.class)
    })
    public ResponseEntity<BasicResponse<List<IntakeHistoryResponse>>> readIntakeHistories(@PathVariable("userId") Long userId, @PathVariable("date") String date) throws ParseException {
        LocalDate localDate = LocalDate.parse(date, DateTimeFormatter.ISO_DATE);
        List<IntakeHistoryResponse> responses = intakeHistoryService.readByDateIntakeHistory(userId, localDate);
        return new ResponseEntity<>(makeBasicResponse(SUCCESS, responses), HttpStatus.OK);
    }


    /**
     * 섭취 기록 수정
     *
     * @param userId               유저 번호
     * @param intakeHistoryRequest 수정할 섭취 기록 정보가 담긴 Dto
     * @return SUCCCESS, userId, HttpStatus.CREATED(201)
     */
    @PutMapping("/{userId}")
    @ApiOperation(value = "섭취 기록 수정", notes = "유저 Id와 수정할 섭취 기록 정보를 받아 수정한다")
    @ApiImplicitParam(name = "userId", value = "섭취 기록 정보를 수정할 유저의 Id", required = true, dataTypeClass = Long.class)
    public ResponseEntity<BasicResponse<Long>> UpdateIntakeHistory(@PathVariable("userId") Long userId, @RequestBody IntakeHistoryRequest intakeHistoryRequest) {
        Long id = intakeHistoryService.updateIntakeHistory(userId, intakeHistoryRequest);
        return new ResponseEntity<>(makeBasicResponse(SUCCESS, id), HttpStatus.CREATED);

    }


    /**
     * 섭취 기록 삭제
     *
     * @param userId               유저 번호
     * @param intakeHistoryRequest 삭제할 섭취 기록 정보가 담긴 Dto
     * @return SUCCCESS, userId, HttpStatus.CREATED(200)
     */
    @DeleteMapping("/{userId}")
    @ApiOperation(value = "섭취 기록 삭제", notes = "유저 Id와 삭제할 섭취 기록 정보를 받아 삭제한다")
    @ApiImplicitParam(name = "userId", value = "섭취 기록 정보를 삭제할 유저의 Id", required = true, dataTypeClass = Long.class)
    public ResponseEntity<BasicResponse<Long>> DeleteIntakeHistory(@PathVariable("userId") Long userId, @RequestBody IntakeHistoryRequest intakeHistoryRequest) {
        Long id = intakeHistoryService.deleteIntakeHistory(userId, intakeHistoryRequest);
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
