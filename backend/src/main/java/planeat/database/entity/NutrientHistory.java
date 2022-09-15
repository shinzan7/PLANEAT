package planeat.database.entity;
/*
 *
 * 유저가 특정날짜에 섭취한 영양제 횟수를 기록
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
import java.time.LocalDate;

@Entity
@Getter
@DynamicUpdate
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Table(name = "nutrient_history")
public class NutrientHistory {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "nutrient_history_id")
    private Long id;

    @ManyToOne
    private UserNutrient userNutrient;

    private LocalDate intakeDate;
    private Integer intakeReal;

    @Builder
    public NutrientHistory(Long id, UserNutrient userNutrient, LocalDate intakeDate, Integer intakeReal) {
        this.id = id;
        this.userNutrient = userNutrient;
        this.intakeDate = intakeDate;
        this.intakeReal = intakeReal;
    }

    public NutrientHistory update(UserNutrient userNutrient, LocalDate intakeDate, Integer intakeReal) {
        this.userNutrient = userNutrient;
        this.intakeDate = intakeDate;
        this.intakeReal = intakeReal;
        return this;
    }
}
