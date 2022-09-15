package planeat.database.entity;

import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.DynamicUpdate;

import javax.persistence.*;

/*
 *
 * 영양성분의 카테고리 태그 (비타민A : 눈건강)
 *
 @author 신지한
 @since 2022-09-15
*/
@Entity
@Getter
@DynamicUpdate
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Table(name = "category")
public class Category {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "category_id")
    private Long id;

    @ManyToOne
    private Ingredient ingredient;

    private String categoryTag;

    @Builder
    public Category(Long id, Ingredient ingredient, String categoryTag) {
        this.id = id;
        this.ingredient = ingredient;
        this.categoryTag = categoryTag;
    }
}
