package planeat.interceptor;

 /*
 *
 * AuthInterceptor
 *
 @author 박윤하
 @since 2022-09-19
 */

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import org.springframework.web.servlet.HandlerInterceptor;
import planeat.config.jwt.JwtService;
import planeat.exception.CustomException;
import planeat.exception.CustomExceptionList;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

@Component
@RequiredArgsConstructor
public class AuthInterceptor implements HandlerInterceptor {

    private final JwtService jwtService;

    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {

        String url = request.getRequestURI();
        if (url.contains("swagger") || url.contains("api-docs") || url.contains("webjars")) {
            return true;
        }

        String accessToken = request.getHeader("accessToken");
        System.out.println();
        System.out.println("================================");
        System.out.println(accessToken);
        System.out.println("================================");
        System.out.println();
        if (jwtService.verifyToken(accessToken)) {
            return true;
        }
        throw new CustomException(CustomExceptionList.ACCESS_TOKEN_ERROR);
    }

}
