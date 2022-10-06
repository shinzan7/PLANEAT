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
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@DynamicUpdate
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Table(name = "nutrient")
public class Nutrient {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "nutrient_id")
    private Long id;

    private String nutrientName;
    private String company;
    private String description;
    private String imagePath;
    private String wordCloudImagePath;


    @OneToMany(cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.LAZY, mappedBy = "nutrient")
    List<NutrientIngredient> nutrientIngredientList = new ArrayList<>();

    @Builder
    public Nutrient(Long id, String nutrientName, String company, String description, String imagePath, String wordCloudImagePath) {
        this.id = id;
        this.nutrientName = nutrientName;
        this.company = company;
        this.description = description;
        this.imagePath = imagePath;
        this.wordCloudImagePath = wordCloudImagePath;
    }


    /**
     * @param nutrientName 영양제 이름
     * @param company      제조회사
     * @param description  상세설명
     * @param imagePath    이미지 경로
     * @return
     */
    public Nutrient createNutrient(String nutrientName, String company, String description, String imagePath, String wordCloudImagePath) {
        return Nutrient.builder()
                .nutrientName(nutrientName)
                .company(company)
                .description(description)
                .imagePath(imagePath)
                .wordCloudImagePath(wordCloudImagePath)
                .build();
    }

    public void putNutrientIngredient(NutrientIngredient nutrientIngredient) {
        this.nutrientIngredientList.add(nutrientIngredient);
    }

    public void updateImagePath(String imagePath) {
        this.imagePath = imagePath;
    }

    public void updateWordCloudImagePath(String wordCloudImagePath) {
        this.wordCloudImagePath = wordCloudImagePath;
    }

}
