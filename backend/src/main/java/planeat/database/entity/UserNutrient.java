package planeat.database.entity;
/*
 *
 * 유저가 섭취하는 영양제
 *
 @author 신지한, 박윤하
 @since 2022-09-15
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
@Table(name = "user_nutrient")
public class UserNutrient {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "user_nutrient_id")
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private User user;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "nutrient_id")
    private Nutrient nutrient;

    private Integer intakeRecommend;


    @JsonIgnore
    @OneToMany(cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.LAZY, mappedBy = "userNutrient")
    List<NutrientHistory> nutrientHistoryList = new ArrayList<>();


    @Builder
    private UserNutrient(Long id, User user, Nutrient nutrient, Integer intakeRecommend) {
        this.id = id;
        this.user = user;
        this.nutrient = nutrient;
        this.intakeRecommend = intakeRecommend;
    }

    public static UserNutrient createUserNutrient(User user, Nutrient nutrient, Integer intakeRecommend){
        return UserNutrient.builder()
                .user(user)
                .nutrient(nutrient)
                .intakeRecommend(intakeRecommend)
                .build();
    }

    public UserNutrient update(User user, Nutrient nutrient, Integer intakeRecommend) {
        this.user = user;
        this.nutrient = nutrient;
        this.intakeRecommend = intakeRecommend;
        return this;
    }

    @Override
    public String toString() {
        return "UserNutrient{" +
                "id=" + id +
                ", user=" + user +
                ", intakeRecommend=" + intakeRecommend +
                '}';
    }
}
