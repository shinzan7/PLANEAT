package planeat.api.dto.user;

/*
 *
 * UserResponse
 *
 @author 박윤하
 @since 2022-09-16
*/

import lombok.Data;

@Data
public class UserResponse {

    String provider;
    String name;
    String email;

}
