package planeat.api.controller;
/*
 *
 * 파일 업로드 컨트롤러
 *
 @author 신지한
 @since 2022-09-20
*/

import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import planeat.api.dto.common.BasicResponse;
import planeat.config.image.S3Uploader;

@RequiredArgsConstructor
@RestController
@RequestMapping("/upload")
public class S3Controller {
    private final S3Uploader s3Uploader;

    @PostMapping
    @ApiOperation(value = "이미지 업로드", notes = "이미지를 업로드하고 생성된 url을 반환한다.")
    public ResponseEntity<BasicResponse<String>> uploadImage(@RequestParam("image") MultipartFile multipartFile) {
        String imageUrl = "";
        try {
            //imageUrl 사진경로
            imageUrl = s3Uploader.uploadFiles(multipartFile, "static");
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity(HttpStatus.BAD_REQUEST);
        }
        return new ResponseEntity(imageUrl, HttpStatus.NO_CONTENT);
    }

    /**
     * 기본 Response 형식 DTO
     *
     * @param message 성공, 실패 여부 메세지 "SUCCESS", "ERROR"
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
