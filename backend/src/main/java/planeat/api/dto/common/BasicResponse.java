package planeat.api.dto.common;

/*
 *
 * BasicResponse
 *
 @author 박윤하
 @since 2022-09-20
*/

import lombok.Builder;
import lombok.Getter;

@Getter
public class BasicResponse<Type> {

    private String message;
    private Type data;

    @Builder
    public BasicResponse(String message, Type data) {
        this.message = message;
        this.data = data;
    }

}
