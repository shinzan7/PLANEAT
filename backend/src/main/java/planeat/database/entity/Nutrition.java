package planeat.database.entity;

/*
 *
 * Nutrition - nutrition table entity
 *
 @author 박윤하
 @since 2022-09-14
*/

import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import planeat.enums.Gender;

import javax.persistence.*;
import java.math.BigDecimal;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Table(name = "nutrition")
public class Nutrition {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "nutrition_id")
    private Long id;

    @Enumerated(EnumType.STRING)
    @Column(name = "gender", nullable = false)
    private Gender gender;

    @Column(name = "age_min", nullable = false)
    private Integer age_min;

    @Column(name = "age_max", nullable = false)
    private Integer age_max;

    @Column(name = "nutri_type", nullable = false)
    private String nutri_type;

    @Column(name = "nutri_unit", nullable = false)
    private String nutri_unit;

    @Column(name = "intake_rec", nullable = false)
    private BigDecimal intake_rec;

    @Column(name = "intake_max", nullable = false)
    private BigDecimal intake_max;

}
