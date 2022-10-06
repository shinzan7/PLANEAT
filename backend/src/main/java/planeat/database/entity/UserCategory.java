package planeat.database.entity;
/*
 *
 * 유저에 저장된 건강고민 태그
 *
 @author 신지한
 @since 2022-09-22
*/

import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.DynamicUpdate;

import javax.persistence.*;

@Entity
@Getter
@DynamicUpdate
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Table(name = "user_category")
public class UserCategory {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "user_category_id")
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private User user;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_category_info_id")
    private UserCategoryInfo userCategoryInfo;


    @Builder
    public UserCategory(Long id, User user, UserCategoryInfo userCategoryInfo) {
        this.id = id;
        this.user = user;
        this.userCategoryInfo = userCategoryInfo;
    }


    public static UserCategory createUserCategory(User user, UserCategoryInfo userCategoryInfo) {
        UserCategory userCategory = UserCategory.builder()
                .user(user)
                .userCategoryInfo(userCategoryInfo)
                .build();
        return userCategory;
    }
}
