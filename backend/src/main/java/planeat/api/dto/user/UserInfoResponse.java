package planeat.api.dto.user;

/*
 *
 * UserInfoResponse
 *
 @author 박윤하
 @since 2022-09-26
*/

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.format.annotation.DateTimeFormat;
import planeat.database.entity.Nutrition;
import planeat.database.entity.User;
import planeat.database.entity.UserRecIntake;
import planeat.enums.Gender;

import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;

@Getter
public class UserInfoResponse {

    private Long userId;
    private String name;
    private Integer birthyear;
    @Enumerated(EnumType.STRING)
    private Gender gender;
    private RecInfo recInfo;
    private List<String> categoriesList;

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
        List<Nutritions> nutritionsList;

        @Getter
        static public class Nutritions {
            String nutri_type;
            String nutri_unit;
            BigDecimal intake_rec;
            BigDecimal intake_max;

            public Nutritions(Nutrition nutrition) {
                this.nutri_type = nutrition.getNutri_type();
                this.nutri_unit = nutrition.getNutri_unit();
                this.intake_rec = nutrition.getIntake_rec();
                this.intake_max = nutrition.getIntake_max();
            }
        }

        public RecInfo(UserRecIntake userRecIntake, List<Nutrition> nutritionList) {
            this.userRecIntakeId = userRecIntake.getId();
            this.updateDate = userRecIntake.getUpdateDate();
            this.height = userRecIntake.getHeight();
            this.weight = userRecIntake.getWeight();
            this.bmi = userRecIntake.getBmi();
            this.active = userRecIntake.getActive();
            this.calorie = userRecIntake.getCalorie();
            this.carbohydrate = userRecIntake.getCarbohydrate();
            this.protein = userRecIntake.getProtein();
            this.fat = userRecIntake.getFat();
            for (Nutrition nutrition : nutritionList) {
                Nutritions nutritions = new Nutritions(nutrition);
                this.nutritionsList.add(nutritions);
            }
        }
    }

    @Builder
    public UserInfoResponse(User user, UserRecIntake userRecIntake, List<Nutrition> nutritions, List<String> categoriesList) {
        this.userId = user.getId();
        this.name = user.getName();
        this.birthyear = user.getBirthyear();
        this.gender = user.getGender();
        this.recInfo = new RecInfo(userRecIntake, nutritions);
        this.categoriesList = categoriesList;
    }

}
