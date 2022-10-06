package planeat.database.entity;

import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.DynamicUpdate;

import javax.persistence.*;

/*
 *
 * 영양제 성분의 함량
 *
 @author 신지한, 박윤하
 @since 2022-09-15
*/
@Entity
@Getter
@DynamicUpdate
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Table(name = "nutrient_ingredient")
public class NutrientIngredient {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "nutrient_ingredient_id")
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "nutrient_id")
    private Nutrient nutrient;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "ingredient_id")
    private Ingredient ingredient;

    private Float ingredientAmount;

    @Builder
    public NutrientIngredient(Long id, Nutrient nutrient, Ingredient ingredient, Float ingredientAmount) {
        this.id = id;
        this.nutrient = nutrient;
        this.ingredient = ingredient;
        this.ingredientAmount = ingredientAmount;
    }

    /**
     * @param nutrient         영양제 객체
     * @param ingredient       영양성분 객체
     * @param ingredientAmount 영양성분 함량
     * @return
     */
    public NutrientIngredient createNutrientIngredient(Nutrient nutrient, Ingredient ingredient, Float ingredientAmount) {
        return NutrientIngredient.builder()
                .nutrient(nutrient)
                .ingredient(ingredient)
                .ingredientAmount(ingredientAmount)
                .build();
    }

}
