package planeat.database.entity;

import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.DynamicUpdate;

import javax.persistence.*;

/*
 *
 * 영양제 리뷰 wordcount
 *
 @author 한하평
 @since 2022-09-29
*/
@Entity
@Getter
@DynamicUpdate
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Table(name = "nutrient_review")
public class NutrientReview {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "nutrient_review_id")
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "nutrient_id")
    private Nutrient nutrient;

    private String keyword;

    private Integer count;

    @Builder
    public NutrientReview(Long id, Nutrient nutrient, String keyword, Integer count) {
        this.id = id;
        this.nutrient = nutrient;
        this.keyword = keyword;
        this.count = count;
    }

}
