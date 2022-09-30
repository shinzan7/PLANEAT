package planeat.api.dto.nutrient;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.math.BigInteger;

/*
 *
 * 영양소, 태그로 검색할 때 반환하는 영양제dto
 * [영양제id, 영양제이름, 제조회사, 상세설명, 이미지경로]
 @author 신지한
 @since 2022-09-30
*/
@Getter
@Setter
@NoArgsConstructor
public class NutrientSearchResponse {
    BigInteger nutrientId;
    String company;
    String description;
    String imagePath;
    String nutrientName;

    @Builder
    public NutrientSearchResponse(BigInteger nutrientId, String company, String description, String imagePath, String nutrientName) {
        this.nutrientId = nutrientId;
        this.company = company;
        this.description = description;
        this.imagePath = imagePath;
        this.nutrientName = nutrientName;
    }
}
