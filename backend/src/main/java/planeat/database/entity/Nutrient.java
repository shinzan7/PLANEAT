package planeat.database.entity;
/*
 *
 * 영양제 이름, 제조회사, 상세설명
 *
 @author 신지한
 @since 2022-09-15
*/
import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.DynamicUpdate;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

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


    @JsonIgnore
    @OneToMany(cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.LAZY, mappedBy = "nutrient")
    List<NutrientIngredient> nutrientIngredientList = new ArrayList<>();


    @Builder
    public Nutrient(Long id, String nutrientName, String company, String description) {
        this.id = id;
        this.nutrientName = nutrientName;
        this.company = company;
        this.description = description;
    }

}
