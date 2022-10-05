package planeat.api.controller;

import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import planeat.api.dto.analysishistory.AnalysisHistoryPercentResponse;
import planeat.api.dto.analysishistory.AnalysisHistoryResponse;
import planeat.api.dto.common.BasicResponse;
import planeat.api.service.AnalysisHistoryService;
import planeat.database.entity.AnalysisHistory;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.List;

@Controller
@RequestMapping("/analysis")
@RequiredArgsConstructor
public class AnalysisHistoryController {
    final AnalysisHistoryService analysisHistoryService;
    static final String SUCCESS = "success";

    @GetMapping("/all")
    @ApiOperation(value = "분석기록 전체 조회", notes = "유저 아이디를 받아 유저의 모든 분석기록을 반환한다.")
    public ResponseEntity<BasicResponse<List<AnalysisHistoryResponse>>> readAllAnalysis(@RequestParam Long userId){
        List<AnalysisHistoryResponse> responseList = analysisHistoryService.getAllAnalysisHistory(userId);
        return new ResponseEntity<>(makeBasicResponse(SUCCESS, responseList), HttpStatus.OK);
    }
    @GetMapping
    @ApiOperation(value = "분석기록 조회", notes = "유저 아이디와 지정날짜를 받아 지정날짜 이후의 모든 분석기록을 반환한다.")
    public ResponseEntity<BasicResponse<List<AnalysisHistoryResponse>>> readAnalysisAfterDate(@RequestParam Long userId, @RequestParam String date){
        LocalDate localDate = LocalDate.parse(date, DateTimeFormatter.ISO_DATE);
        List<AnalysisHistoryResponse> historyList = analysisHistoryService.readAllAnalysisHistoryByDateAfter(userId, localDate);
        return new ResponseEntity<>(makeBasicResponse(SUCCESS, historyList), HttpStatus.OK);
    }

    @GetMapping("/{date}")
    @ApiOperation(value = "특정 날짜 분석기록 조회", notes = "유저 아이디와 지정날짜를 받아 지정날짜의 분석기록을 반환한다.")
    public ResponseEntity<BasicResponse<List<AnalysisHistoryResponse>>> readAnalysisDate(@RequestParam Long userId, @PathVariable("date") String date){
        LocalDate localDate = LocalDate.parse(date, DateTimeFormatter.ISO_DATE);
        List<AnalysisHistoryResponse> historyList = analysisHistoryService.readFirstAnalysisHistoryByDate(userId, localDate);
        return new ResponseEntity<>(makeBasicResponse(SUCCESS, historyList), HttpStatus.OK);
    }

    @GetMapping("/percent")
    @ApiOperation(value = "지정날짜 이후 평균비율 조회", notes = "유저 아이디와 지정날짜를 받아 지정날짜 이후의 모든 분석기록의 비율의 평균을 반환한다.")
    public ResponseEntity<BasicResponse<AnalysisHistoryPercentResponse>> readAnalysisPercentAfterDate(@RequestParam Long userId, @RequestParam String date){
        LocalDate localDate = LocalDate.parse(date, DateTimeFormatter.ISO_DATE);
        AnalysisHistoryPercentResponse response = analysisHistoryService.makeAverageAnalysisHistoryByDateAfter(userId, localDate);
        return new ResponseEntity<>(makeBasicResponse(SUCCESS, response), HttpStatus.OK);
    }

    @GetMapping("/percent/one")
    @ApiOperation(value = "지정날짜 평균비율 조회", notes = "유저 아이디와 지정날짜를 받아 그날의 분석기록의 비율을 반환한다.")
    public ResponseEntity<BasicResponse<AnalysisHistoryPercentResponse>> readAnalysisPercentDate(@RequestParam Long userId, @RequestParam String date){
        LocalDate localDate = LocalDate.parse(date, DateTimeFormatter.ISO_DATE);
        AnalysisHistoryPercentResponse response = analysisHistoryService.makeAverageAnalysisHistoryByDate(userId, localDate);
        return new ResponseEntity<>(makeBasicResponse(SUCCESS, response), HttpStatus.OK);
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
