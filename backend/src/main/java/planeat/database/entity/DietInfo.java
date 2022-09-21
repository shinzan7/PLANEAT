package planeat.database.entity;

/*
 * 식단 정보 엔티티
 * DietInfo - diet_info table entity
 *
 @author 박윤하
 @since 2022-09-14
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
@Table(name = "diet_info")
public class DietInfo {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "diet_info_id")
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "my_diet_id")
    private MyDiet myDiet;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "food_info_id")
    private FoodInfo foodInfo;

    @Column(name = "amount", nullable = false)
    private BigDecimal amount;


    @Builder
    public DietInfo(Long id, MyDiet myDiet, FoodInfo foodInfo, BigDecimal amount) {
        this.id = id;
        this.myDiet = myDiet;
        this.foodInfo = foodInfo;
        this.amount = amount;
    }

//    public void setAmount(BigDecimal amount) { this.amount = amount; }

    public DietInfo update(BigDecimal amount) {
        this.amount = amount;
        return this;
    }


}
