package planeat.database.entity;

/*
 * 섭취 음식 엔티티
 * IntakeFood - intake_food table entity
 *
 @author 박윤하
 @since 2022-09-15
*/

import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.DynamicUpdate;

import javax.persistence.*;
import java.math.BigDecimal;

@Entity
@Getter
@DynamicUpdate
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Table(name = "intake_food")
public class IntakeFood {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "intake_food_id")
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "intake_history_id")
    private IntakeHistory intakeHistory;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "food_info_id")
    private FoodInfo foodInfo;

    @Column(name = "amount", nullable = false)
    private BigDecimal amount;


    @Builder
    public IntakeFood(Long id, IntakeHistory intakeHistory, FoodInfo foodInfo, BigDecimal amount) {
        this.id = id;
        this.intakeHistory = intakeHistory;
        this.foodInfo = foodInfo;
        this.amount = amount;
    }


    public static IntakeFood createIntakeFood(FoodInfo foodInfo, BigDecimal amount, IntakeHistory intakeHistory) {
        return IntakeFood.builder()
                .intakeHistory(intakeHistory)
                .foodInfo(foodInfo)
                .amount(amount)
                .build();
    }

}
