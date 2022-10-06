package planeat.database.entity;

/*
 * 유저 권장 섭취량 엔티티
 * UserRecIntake - user_rec_intake table entity
 *
 @author 박윤하
 @since 2022-09-14
*/

import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.DynamicUpdate;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;
import org.springframework.format.annotation.DateTimeFormat;
import planeat.api.dto.user.UserInfoRequest;

import javax.persistence.*;
import java.math.BigDecimal;
import java.time.LocalDate;

@Entity
@Getter
@DynamicUpdate
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Table(name = "user_rec_intake")
public class UserRecIntake {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "user_rec_intake_id")
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private User user;

    @DateTimeFormat(pattern = "yyyy-MM-dd")
    @Column(name = "update_date", nullable = false)
    private LocalDate updateDate;

    @Column(name = "height", nullable = false)
    private BigDecimal height;

    @Column(name = "weight", nullable = false)
    private BigDecimal weight;

    @Column(name = "bmi", nullable = false)
    private BigDecimal bmi;

    @Column(name = "active", nullable = false)
    private BigDecimal active;

    @Column(name = "calorie", nullable = false)
    private Float calorie;

    @Column(name = "carbohydrate", nullable = false)
    private Float carbohydrate;

    @Column(name = "protein", nullable = false)
    private Float protein;

    @Column(name = "fat", nullable = false)
    private Float fat;


    @Builder
    public UserRecIntake(Long id, User user, LocalDate updateDate, BigDecimal height, BigDecimal weight, BigDecimal bmi, BigDecimal active, Float calorie, Float carbohydrate, Float protein, Float fat) {
        this.id = id;
        this.user = user;
        this.updateDate = updateDate;
        this.height = height;
        this.weight = weight;
        this.bmi = bmi;
        this.active = active;
        this.calorie = calorie;
        this.carbohydrate = carbohydrate;
        this.protein = protein;
        this.fat = fat;
    }

    public static UserRecIntake createUserRecIntake(User user, UserInfoRequest.RecInfo recInfo) {
        UserRecIntake userRecIntake = UserRecIntake.builder()
                .user(user)
                .updateDate(recInfo.getUpdateDate())
                .height(recInfo.getHeight())
                .weight(recInfo.getWeight())
                .bmi(recInfo.getBmi())
                .active(recInfo.getActive())
                .calorie(recInfo.getCalorie())
                .carbohydrate(recInfo.getCarbohydrate())
                .protein(recInfo.getProtein())
                .fat(recInfo.getFat())
                .build();
        return userRecIntake;
    }

    public static UserRecIntake updateUserRecIntake(User user, UserInfoRequest userInfoRequest) {
        UserRecIntake userRecIntake = UserRecIntake.builder()
                .id(userInfoRequest.getRecInfo().getUserRecIntakeId())
                .user(user)
                .updateDate(userInfoRequest.getRecInfo().getUpdateDate())
                .height(userInfoRequest.getRecInfo().getHeight())
                .weight(userInfoRequest.getRecInfo().getWeight())
                .bmi(userInfoRequest.getRecInfo().getBmi())
                .active(userInfoRequest.getRecInfo().getActive())
                .calorie(userInfoRequest.getRecInfo().getCalorie())
                .carbohydrate(userInfoRequest.getRecInfo().getCarbohydrate())
                .protein(userInfoRequest.getRecInfo().getProtein())
                .fat(userInfoRequest.getRecInfo().getFat())
                .build();
        return userRecIntake;
    }

}
