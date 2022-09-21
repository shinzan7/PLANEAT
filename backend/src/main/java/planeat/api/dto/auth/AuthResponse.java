package planeat.api.dto.auth;

/*
 *
 * AuthResponse
 *
 @author 박윤하
 @since 2022-09-16
*/

import lombok.Data;

@Data
public class AuthResponse {

    Integer statusCode;
    String message;
    String accessToken;
    String refeshToken;
    String accessTokenExpiration;
    String refreshTokenExpiration;
    Long userId;
    String name;

}
