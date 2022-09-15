package planeat.database.entity;
/*
 *
 * 유저의 날짜별 영양섭취 상세기록 데이터
 *
 @author 신지한
 @since 2022-09-15
*/
import lombok.*;
import org.hibernate.annotations.DynamicUpdate;

import javax.persistence.*;

@Entity
@Getter
@DynamicUpdate
@Builder
@AllArgsConstructor
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Table(name = "analysis_history")
public class AnalysisHistory {
    @Id @GeneratedValue
    @Column(name = "analysis_history_id")
    private Long id;

    @ManyToOne
    private User user;
    private String analysis_score;

    private Float calorie;
    private Float protein;
    private Float fat;
    private Float carbohydrate;
    private Float sugar;
    private Float dietary_fiber;
    private Float calcium;
    private Float iron;
    private Float magnesium;
    private Float phosphorus;
    private Float potassium;
    private Float sodium;
    private Float zinc;
    private Float copper;
    private Float manganese;
    private Float selenium;
    @Column(name = "vitamin_a")
    private Float vitaminA;
    @Column(name = "vitamin_d")
    private Float vitaminD;
    private Float vitaminB6;
    private Float folate;
    private Float vitaminB12;
    @Column(name = "vitamin_c")
    private Float vitaminC;
    private Float cholesterol;
    private Float fattyAcid;
    private Float linoleicAcid;
    private Float alphaLinoleicAcid;
    private Float transFattyAcid;
    private Float vitaminB1;
    private Float vitaminB2;

}
