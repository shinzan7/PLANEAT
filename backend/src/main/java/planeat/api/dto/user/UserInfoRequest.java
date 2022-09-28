package planeat.api.dto.user;

/*
 *
 * UserInfoRequest
 *
 @author 박윤하
 @since 2022-09-16
*/

import lombok.*;
import org.springframework.format.annotation.DateTimeFormat;
import planeat.enums.Gender;

import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
public class UserInfoRequest {

    private Long userId;
    private String name;
    private String email;
    private String provider;
    private Integer birthyear;
    @Enumerated(EnumType.STRING)
    private Gender gender;
    private RecInfo recInfo;
    private List<Categories> categoriesList;

    @Getter
    @Setter
    @NoArgsConstructor
    static public class RecInfo {
        Long userRecIntakeId;
        @DateTimeFormat(pattern = "yyyy-MM-dd")
        LocalDate updateDate;
        BigDecimal height;
        BigDecimal weight;
        BigDecimal bmi;
        BigDecimal active;
        Float calorie;
        Float carbohydrate;
        Float protein;
        Float fat;

        public RecInfo(Long userRecIntakeId, LocalDate updateDate, BigDecimal height, BigDecimal weight, BigDecimal bmi, BigDecimal active, Float calorie, Float carbohydrate, Float protein, Float fat) {
            this.userRecIntakeId = userRecIntakeId;
            this.updateDate = updateDate;
            this.height = height;
            this.weight = weight;
            this.bmi = bmi;
            this.active = active;
            this.calorie = calorie;
            this.carbohydrate = carbohydrate;
            this.protein = protein;
            this.fat = fat;
        }
    }

    @Getter
    @Setter
    @NoArgsConstructor
    static public class Categories {
        Long userId;
        Integer userCategoryInfoId;

        public Categories(Long userId, Integer userCategoryInfoId) {
            this.userId = userId;
            this.userCategoryInfoId = userCategoryInfoId;
        }
    }

    @Builder
    public UserInfoRequest(Long userId, String name, String email, String provider, Integer birthyear, Gender gender, RecInfo recInfo, List<Categories> categoriesList) {
        this.userId = userId;
        this.name = name;
        this.email = email;
        this.provider = provider;
        this.birthyear = birthyear;
        this.gender = gender;
        this.recInfo = recInfo;
        this.categoriesList = categoriesList;
    }

}
