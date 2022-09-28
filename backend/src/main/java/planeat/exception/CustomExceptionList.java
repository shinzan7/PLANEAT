package planeat.exception;

/*
 *
 * CustomExceptionList
 *
 @author 박윤하
 @since 2022-09-16
*/

import lombok.Getter;
import lombok.ToString;
import org.springframework.http.HttpStatus;

@Getter
@ToString
public enum CustomExceptionList {

    REFRESH_TOKEN_ERROR(HttpStatus.UNAUTHORIZED, "E001", "리프레쉬 토큰 오류입니다."),
    USER_NOT_FOUND_ERROR(HttpStatus.NOT_FOUND, "E002", "존재하지 않는 회원입니다."),
    ACCESS_TOKEN_ERROR(HttpStatus.UNAUTHORIZED, "E003", "엑세스 토큰 오류입니다."),
    FOODINFO_NOT_FOUND_ERROR(HttpStatus.NOT_FOUND, "E004", "존재하지 않는 식품 정보입니다."),
    MYDIET_NOT_FOUND_ERROR(HttpStatus.NOT_FOUND, "E005", "존재하지 않는 내 식단입니다."),
    INTAKEHISTORY_NOT_FOUND_ERROR(HttpStatus.NOT_FOUND, "E006", "존재하지 않는 섭취 기록입니다."),
    NUTRIENT_NOT_FOUND_ERROR(HttpStatus.NOT_FOUND, "E007", "존재하지 않는 영양제입니다."),
    USER_NUTRIENT_NOT_FOUND_ERROR(HttpStatus.NOT_FOUND, "E008", "존재하지 않는 유저 영양제입니다."),
    NUTRIENT_HISTORY_NOT_FOUND_ERROR(HttpStatus.NOT_FOUND, "E009", "존재하지 않는 영양제 섭취기록입니다."),
    UPLOAD_ERROR(HttpStatus.NOT_FOUND, "E010", "업로드 오류입니다.");

    private final HttpStatus status;
    private final String code;
    private String message;


    CustomExceptionList(HttpStatus status, String code, String message) {
        this.status = status;
        this.code = code;
        this.message = message;
    }

}
