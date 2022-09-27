package planeat.api.controller;

/*
 *
 * AuthController
 *
 @author 박윤하
 @since 2022-09-16
 *
 * 스웨거 접속 url
 * http://localhost:9000/api/swagger-ui/#/
*/

import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.util.UriComponentsBuilder;
import planeat.config.jwt.Jwt;
import planeat.config.jwt.JwtService;
import planeat.database.entity.User;
import planeat.database.repository.UserRepository;
import planeat.exception.CustomException;
import planeat.exception.CustomExceptionList;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.util.HashMap;
import java.util.Map;

@Controller
@RequestMapping("/oauth")
@RequiredArgsConstructor
public class AuthController {

    private final JwtService jwtService;
    private final UserRepository userRepository;


    /**
     * AccessToken, RefreshToken 발급
     *
     * @param response FrontEnd 페이지로 리다이렉트할 때 담을 정보들
     * @param authentication 유저 정보
     * @throws IOException
     */
    @GetMapping("/info")
    public void createToken(HttpServletResponse response, Authentication authentication) throws IOException {
        OAuth2User oAuth2User = (OAuth2User) authentication.getPrincipal();
        Map<String, Object> attributes = oAuth2User.getAttributes();

        User user = getAuthUser(attributes);

        Jwt token = jwtService.generateToken(user.getProvider(), user.getName(), user.getEmail());

        user.setRefreshToken(token.getRefreshToken());
        userRepository.save(user);

        String accessTokenExpiration = jwtService.dateToString(token.getAccessToken());
        String refreshTokenExpiration = jwtService.dateToString(token.getRefreshToken());

        String birthYear = user.getBirthyear() == null ? "" : user.getBirthyear().toString();
        String gender = user.getGender() == null ? "" : user.getGender().toString();

        response.sendRedirect(UriComponentsBuilder.fromUriString("http://j7a701.p.ssafy.io/logincheck")
                .queryParam("accessToken", token.getAccessToken())
                .queryParam("refreshToken", token.getRefreshToken())
                .queryParam("accessTokenExpiration", accessTokenExpiration)
                .queryParam("refreshTokenExpiration", refreshTokenExpiration)
                .queryParam("userId", user.getId().toString())
                .queryParam("name", user.getName())
                .queryParam("birthYear", birthYear)
                .queryParam("gender", gender)
                .build()
                .encode(StandardCharsets.UTF_8)
                .toUriString());

    }


    /**
     * AccessToken 만료 시 재발급
     *
     * @param request RefreshToken 정보
     * @param response
     * @return 재발급된 AccessToken 반환
     */
    @GetMapping("/refresh")
    public ResponseEntity<Map<String, String>> checkRefreshToken(HttpServletRequest request, HttpServletResponse response) {
        String refreshToken = request.getHeader("refreshToken");

        if (!jwtService.verifyToken(refreshToken)) {
            throw new CustomException(CustomExceptionList.REFRESH_TOKEN_ERROR);
        }

        String provider = jwtService.getProvider(refreshToken);
        String name = jwtService.getName(refreshToken);
        String email = jwtService.getEmail(refreshToken);

        User user = userRepository.findByEmailAndProvider(email, provider)
                .orElseThrow(() -> new CustomException(CustomExceptionList.USER_NOT_FOUND_ERROR));

        if (!user.getRefreshToken()
                .equals(refreshToken)) {
            throw new CustomException(CustomExceptionList.REFRESH_TOKEN_ERROR);
        }

        Jwt token = jwtService.generateToken(provider, name, email);

        String accessTokenExpiration = jwtService.dateToString(token.getAccessToken());

        Map<String, String> map = new HashMap<>();
        map.put("accessToken", token.getAccessToken());
        map.put("accessTokenExpiration", accessTokenExpiration);

        return new ResponseEntity<>(map, HttpStatus.OK);

    }

    private User getAuthUser(Map<String, Object> attributes) {
        return userRepository.findByEmailAndProvider((String) attributes.get("email"), (String) attributes.get("provider"))
                             .orElseThrow(() -> new CustomException(CustomExceptionList.USER_NOT_FOUND_ERROR));
    }

}
