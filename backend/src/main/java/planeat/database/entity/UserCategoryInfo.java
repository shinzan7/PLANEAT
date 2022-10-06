package planeat.database.entity;
/*
 *
 * 건강고민 태그 이름
 * ex) 간 겅간, 뼈 건강 ...
 *
 @author 신지한
 @since 2022-09-22
*/

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.DynamicUpdate;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@DynamicUpdate
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Table(name = "user_category_info")
public class UserCategoryInfo {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "user_category_info_id")
    private Integer id;
    private String userCategoryName;

    @Builder
    public UserCategoryInfo(Integer id, String userCategoryName) {
        this.id = id;
        this.userCategoryName = userCategoryName;
    }

    @JsonIgnore
    @OneToMany(fetch = FetchType.LAZY, mappedBy = "userCategoryInfo")
    List<UserCategory> userCategoryList = new ArrayList<>();

}
