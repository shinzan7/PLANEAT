package planeat.database.entity;
/*
 *
 * 유저가 섭취하는 영양제
 *
 @author 신지한
 @since 2022-09-15
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
@Table(name = "user_nutrient")
public class UserNutrient {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "user_nutrient_id")
    private Long id;

    @ManyToOne
    private User user;

    @ManyToOne
    private Nutrient nutrient;

    private Integer intakeRecommend;

    @Builder
    public UserNutrient(User user, Nutrient nutrient, Integer intakeRecommend) {
        this.user = user;
        this.nutrient = nutrient;
        this.intakeRecommend = intakeRecommend;
    }

    public UserNutrient update(User user, Nutrient nutrient, Integer intakeRecommend) {
        this.user = user;
        this.nutrient = nutrient;
        this.intakeRecommend = intakeRecommend;
        return this;
    }
}
