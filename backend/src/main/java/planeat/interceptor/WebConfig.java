package planeat.interceptor;

 /*
 *
 * WebConfig
 *
 @author 박윤하
 @since 2022-09-19
 */

import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.*;

@Configuration
//@EnableWebMvc
@RequiredArgsConstructor
//public class WebConfig implements WebMvcConfigurer {
public class WebConfig extends WebMvcConfigurationSupport {

    private final AuthInterceptor authInterceptor;

    @Override
    public void addInterceptors(InterceptorRegistry interceptorRegistry) {

        interceptorRegistry.addInterceptor(authInterceptor)
                .addPathPatterns("/**")
                .excludePathPatterns("/oauth/**");

    }

    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
        registry.addResourceHandler("/swagger-ui.html").addResourceLocations("classpath:/META-INF/resources/");
        registry.addResourceHandler("/webjars/**").addResourceLocations("classpath:/META-INF/resources/webjars/");
        super.addResourceHandlers(registry);
    }

}

