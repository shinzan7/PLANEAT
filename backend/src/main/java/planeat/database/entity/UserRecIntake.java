package planeat.database.entity;

/*
 *
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

import javax.persistence.*;
import java.math.BigDecimal;
import java.time.LocalDate;

@Entity
@Getter
@DynamicUpdate
@EntityListeners(AuditingEntityListener.class)
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

    @CreatedDate
    @Column(name = "update_date")
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
    public UserRecIntake(LocalDate updateDate, BigDecimal height, BigDecimal weight, BigDecimal bmi, BigDecimal active, Float calorie, Float carbohydrate, Float protein, Float fat) {
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


    public void setHeight(BigDecimal height) { this.height = height; }
    public void setWeight(BigDecimal weight) { this.weight = weight; }
    public void setBmi(BigDecimal bmi) { this.bmi = bmi; }
    public void setActive(BigDecimal active) { this.active = active; }
    public void setCalorie(Float calorie) { this.calorie = calorie; }
    public void setCarbohydrate(Float carbohydrate) { this.carbohydrate = carbohydrate; }
    public void setProtein(Float protein) { this.protein = protein; }
    public void setFat(Float fat) { this.fat = fat; }

    public UserRecIntake update(BigDecimal height, BigDecimal weight, BigDecimal bmi, BigDecimal active, Float calorie, Float carbohydrate, Float protein, Float fat) {
        this.height = height;
        this.weight = weight;
        this.bmi = bmi;
        this.active = active;
        this.calorie = calorie;
        this.carbohydrate = carbohydrate;
        this.protein = protein;
        this.fat = fat;
        return this;
    }

}
