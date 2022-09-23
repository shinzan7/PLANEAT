package planeat.api.controller;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import planeat.api.dto.common.BasicResponse;
import planeat.api.dto.nutrient.NutrientRequest;
import planeat.api.dto.nutrient.NutrientResponse;
import planeat.api.service.NutrientService;
import planeat.database.entity.Nutrient;
import planeat.database.repository.NutrientRepository;

import java.util.Optional;

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

    final NutrientService nutrientService;
    final NutrientRepository nutrientRepository;

    static final String SUCCESS = "success";

//    @GetMapping ResponseEntity<String> hi(){
//        return new ResponseEntity<>("작동테스트", HttpStatus.OK);
//    }

    @GetMapping
    public ResponseEntity<BasicResponse<NutrientResponse>> readNutrient(Long id){

        NutrientResponse nutrientResponse = nutrientService.readNutrientById(id);

        return new ResponseEntity<>(makeBasicResponse(SUCCESS , nutrientResponse), HttpStatus.CREATED);
    }

    @PostMapping
    public ResponseEntity<BasicResponse<String>> createNutrient(NutrientRequest nutrientRequest){
        nutrientService.createNutrientAndIngredients(nutrientRequest);
        return new ResponseEntity<>(makeBasicResponse(SUCCESS , "hi"), HttpStatus.CREATED);
    }

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

    /**
     * 기본 Response 형식 DTO
     *
     * @param message 성공, 실패 여부 메세지 "SUCCESS", "ERROR"
     * @param data 반환할 데이터
     * @return ResponseEntity의 Body
     */
    private <T> BasicResponse<T> makeBasicResponse(String message, T data) {
        return BasicResponse.<T>builder()
                .message(message)
                .data(data)
                .build();
    }

}
