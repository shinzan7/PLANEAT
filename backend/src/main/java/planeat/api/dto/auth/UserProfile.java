package planeat.api.dto.auth;

/*
 *
 * UserProfile
 *
 @author 박윤하
 @since 2022-09-15
*/

import lombok.Getter;
import lombok.Setter;
import planeat.database.entity.User;

@Getter
@Setter
public class UserProfile {

    private String provider;
    private String email;
    private String name;

    public User toUser() {
        return User.builder()
                .provider(provider)
                .email(email)
                .name(name)
                .build();
    }

}
