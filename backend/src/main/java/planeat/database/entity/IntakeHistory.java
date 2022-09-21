package planeat.database.entity;

/*
 * 섭취 기록 엔티티
 * IntakeHistory - intake_history table entity
 *
 @author 박윤하
 @since 2022-09-15
*/

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.DynamicUpdate;
import planeat.enums.MealType;

import javax.persistence.*;
import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Entity
@Getter
@DynamicUpdate
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Table(name = "intake_history")
public class IntakeHistory {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "intake_history_id")
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private User user;

    @Column(name = "date", nullable = false)
    private Date date;

    @Enumerated(EnumType.STRING)
    @Column(name = "meal_type", nullable = false)
    private MealType mealType;


    @JsonIgnore
    @OneToMany(cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.LAZY, mappedBy = "intakeHistory")
    List<IntakeFood> intakeFoodList = new ArrayList<>();


    @Builder
    public IntakeHistory(Long id, User user, Date date, MealType mealType) {
        this.id = id;
        this.user = user;
        this.date = date;
        this.mealType = mealType;
    }

//    public void setDate(Date date) { this.date = date; }
//    public void setMealType(MealType mealType) { this.mealType = mealType; }

    public IntakeHistory update(Date date, MealType mealType) {
        this.date = date;
        this.mealType = mealType;
        return this;
    }

}
