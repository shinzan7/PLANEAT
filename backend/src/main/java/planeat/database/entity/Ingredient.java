package planeat.database.entity;

import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.DynamicUpdate;

import javax.persistence.*;

/*
 *
 * 영양성분 이름 (망간, 비타민A, 비타민C ...)
 *
 @author 신지한
 @since 2022-09-15
*/
@Entity
@Getter
@DynamicUpdate
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Table(name = "ingredient")
public class Ingredient {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ingredient_id")
    private Long id;

    private String ingredientName;

    @Builder
    public Ingredient(String ingredientName) {
        this.ingredientName = ingredientName;
    }
}
