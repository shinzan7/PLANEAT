package planeat.api.controller;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/*
 *
 * 영양제 데이터 API
 *
 @author 신지한
 @since 2022-09-15
*/
@RestController
@RequiredArgsConstructor
@Slf4j
@RequestMapping("/nutrient")
public class NutrientController {

//    @GetMapping
//    public ResponseEntity<BasicResponse<ExerciseMemberHistoryResponse>> exerciseMemberHistory(@ModelAttribute ExerciseMemberHistoryRequest request) {
//        Long memberId = request.getMemberId();
//        int year = request.getYear();
//        int month = request.getMonth();
//
//        ExerciseMemberHistoryResponse response = exerciseService.memberHistoryByYearAndMonth(memberId, year, month);
//
//        return new ResponseEntity<>(makeBasicResponse(SUCCESS, response), HttpStatus.OK);
//    }
}
