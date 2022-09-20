package planeat.api.dto.user;

/*
 *
 * UserInfoRequest
 *
 @author 박윤하
 @since 2022-09-16
*/

import lombok.Data;

@Data
public class UserInfoRequest {

    Long userId;
    String name;

}
