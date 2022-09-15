package planeat.database.entity;
/*
 *
 * 영양제 이름, 제조회사, 상세설명
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

@Entity
@Getter
@DynamicUpdate
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Table(name = "nutrient")
public class Nutrient {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "nutrient_id")
    private Long id;

    private String nutrientName;
    private String company;
    private String description;

    @Builder
    public Nutrient(String nutrientName, String company, String description) {
        this.nutrientName = nutrientName;
        this.company = company;
        this.description = description;
    }

}
