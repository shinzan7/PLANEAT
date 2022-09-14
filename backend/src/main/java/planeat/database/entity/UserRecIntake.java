package planeat.database.entity;

/*
 *
 * UserRecIntake - user_rec_intake table entity
 *
 @author 박윤하
 @since 2022-09-14
*/

import lombok.AccessLevel;
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
    private float calorie;

    @Column(name = "carbohydrate", nullable = false)
    private float carbohydrate;

    @Column(name = "protein", nullable = false)
    private float protein;

    @Column(name = "fat", nullable = false)
    private float fat;


    @Builder



    public void setUpdateDate()

    public UserRecIntake update(String name, String email) {
        this.name = name;
        this.email = email;
        return this;
    }

}
