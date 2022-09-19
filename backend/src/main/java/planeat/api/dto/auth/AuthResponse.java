package planeat.api.dto.auth;

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
