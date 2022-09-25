package planeat.api.controller;

/*
 *
 * IntakeHistoryController - 섭취 기록 API
 *
 @author 박윤하
 @since 2022-09-25
*/

import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import planeat.api.dto.common.BasicResponse;
import planeat.api.dto.intakehistory.IntakeHistoryRequest;
import planeat.api.dto.intakehistory.IntakeHistoryResponse;
import planeat.api.service.IntakeHistoryService;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/intake-histories")
public class IntakeHistoryController {

    final IntakeHistoryService intakeHistoryService;

    static final String SUCCESS = "success";

    /**
     * 섭취 기록 등록
     *
     * @param userId 유저 번호
     * @param intakeHistoryRequest 등록할 섭취 기록 정보가 담긴 Dto
     * @return SUCCCESS, userId, HttpStatus.CREATED(201)
     */
    @PostMapping("/{userId}")
    public ResponseEntity<BasicResponse<Long>> createIntakeHistory(@PathVariable("userId") Long userId, @RequestBody IntakeHistoryRequest intakeHistoryRequest) {
        Long id = intakeHistoryService.createIntakeHistory(userId, intakeHistoryRequest);
        return new ResponseEntity<>(makeBasicResponse(SUCCESS, id), HttpStatus.CREATED);
    }


    /**
     * 날짜별 섭취 기록 정보 조회
     *
     * @param userId 유저 번호
     * @param date 조회할 날짜
     * @return SUCCCESS, List<MyDietResponse>, HttpStatus.OK(200)
     */
    @GetMapping("/{userId}/{date}")
    public ResponseEntity<BasicResponse<List<IntakeHistoryResponse>>> readIntakeHistories(@PathVariable("userId") Long userId, @PathVariable("date") String date) throws ParseException {
        LocalDate localDate = LocalDate.parse(date, DateTimeFormatter.ISO_DATE);
        List<IntakeHistoryResponse> responses = intakeHistoryService.readByDateIntakeHistory(userId, localDate);
        return new ResponseEntity<>(makeBasicResponse(SUCCESS, responses), HttpStatus.OK);

    }

    /*
     * 날짜-구분 별로 섭취 기록 조회
     *
     * 그냥 위에꺼로 보내고 프론트에서 잘라 쓰는게 낫나..? 모르겠네....프론트한테 물어보기
     *
     * @param userId 유저 번호
     * @param date 날짜
     * @param type 구분(아침/점심/저녁/간식)
     * @return SUCCCESS, List<MyDietResponse>, HttpStatus.OK(200)
     */
//    @GetMapping("/{userId}/{date}/{type}")
//    public ResponseEntity<BasicResponse<List<IntakeHistoryResponse>>> readByDateAndTypeIntakeHistories(@PathVariable("userId") Long userId, @PathVariable("date") Date date, @PathVariable("type") String type) {
//        List<IntakeHistoryResponse> responses = intakeHistoryService.readByDateAndTypeIntakeHistory(userId, date, type);
//        return new ResponseEntity<>(makeBasicResponse(SUCCESS, responses), HttpStatus.OK);
//
//    }


    /**
     * 섭취 기록 수정
     *
     * @param userId 유저 번호
     * @param intakeHistoryRequest 수정할 섭취 기록 정보가 담긴 Dto
     * @return SUCCCESS, userId, HttpStatus.CREATED(201)
     */
    @PutMapping("/{userId}")
    public ResponseEntity<BasicResponse<Long>> UpdateIntakeHistory(@PathVariable("userId") Long userId, @RequestBody IntakeHistoryRequest intakeHistoryRequest) {
        Long id = intakeHistoryService.updateIntakeHistory(userId, intakeHistoryRequest);
        return new ResponseEntity<>(makeBasicResponse(SUCCESS, id), HttpStatus.CREATED);

    }


    /**
     * 섭취 기록 삭제
     *
     * @param userId 유저 번호
     * @param intakeHistoryRequest 삭제할 섭취 기록 정보가 담긴 Dto
     * @return SUCCCESS, userId, HttpStatus.CREATED(200)
     */
    @DeleteMapping("/{userId}")
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
