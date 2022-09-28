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
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;
import planeat.api.dto.intakehistory.IntakeHistoryRequest;
import planeat.enums.MealType;

import javax.persistence.*;
import java.time.LocalDate;
import java.util.ArrayList;
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
    private LocalDate date;

    @Enumerated(EnumType.STRING)
    @Column(name = "meal_type", nullable = false)
    private MealType mealType;


    @JsonIgnore
    @OneToMany(cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.LAZY, mappedBy = "intakeHistory")
    List<IntakeFood> intakeFoodList = new ArrayList<>();


    @Builder
    public IntakeHistory(Long id, User user, LocalDate date, MealType mealType) {
        this.id = id;
        this.user = user;
        this.date = date;
        this.mealType = mealType;
    }

    public static IntakeHistory createIntakeHistory(User user, IntakeHistoryRequest intakeHistoryRequest) {
        IntakeHistory intakeHistory = IntakeHistory.builder()
                .user(user)
                .date(intakeHistoryRequest.getDate())
                .mealType(intakeHistoryRequest.getMealType())
                .build();
        return intakeHistory;
    }


    public static IntakeHistory updateIntakeHistory(User user, IntakeHistoryRequest intakeHistoryRequest) {
        IntakeHistory intakeHistory = IntakeHistory.builder()
                .id(intakeHistoryRequest.getIntakeHistoryId())
                .date(intakeHistoryRequest.getDate())
                .user(user)
                .mealType(intakeHistoryRequest.getMealType())
                .build();
        return intakeHistory;
    }

}
