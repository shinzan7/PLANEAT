package planeat.api.controller;
/*
 *
 * 파일 업로드 컨트롤러
 *
 @author 신지한
 @since 2022-09-20
*/
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import planeat.config.image.S3Uploader;

@RequiredArgsConstructor
@RestController
@RequestMapping("/upload")
public class S3Controller {
    private final S3Uploader s3Uploader;

    @PostMapping
    public ResponseEntity<String> updateNutrientImage(@RequestParam("nutrientName") String nutrientName, @RequestParam("images") MultipartFile multipartFile) {
        System.out.println(nutrientName);
        try {
            //imageUrl 사진경로
            String imageUrl = s3Uploader.uploadFiles(multipartFile, "static");
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity(HttpStatus.BAD_REQUEST);
        }
        return new ResponseEntity(HttpStatus.NO_CONTENT);
    }
}
