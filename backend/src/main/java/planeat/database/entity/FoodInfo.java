package planeat.database.entity;
/*
 *
 * FoodInfo의 설명을 여기 작성한다.
 * 음식의 세부정보 data
 *
 @author 신지한
 @since 2022-09-14
*/
import lombok.*;
import org.hibernate.annotations.DynamicUpdate;
import planeat.enums.FoodType;

import javax.persistence.*;

@Entity
@Getter
@Setter
@DynamicUpdate
@NoArgsConstructor//(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Table(name = "food_info")
public class FoodInfo {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "food_info_id")
    private Long id;

    private Long foodUser;
    @Enumerated(EnumType.STRING)
    private FoodType type;
    private String name;
    private Integer year;
    private String manufacturer;
    private String categoryLarge;
    private String categoryDetail;
    private Integer servingSize;
    private String servingUnit;
    @Column(name = "capacity_g")
    private Float capacityG;
    private Float capacityMl;
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

    //매핑관계 테이블
    //식단정보
    //섭취음식

}
