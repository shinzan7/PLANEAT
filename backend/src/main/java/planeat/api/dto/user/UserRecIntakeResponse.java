package planeat.api.dto.user;

import lombok.Builder;
import lombok.Getter;
import planeat.database.entity.Nutrition;
import planeat.database.entity.User;
import planeat.database.entity.UserRecIntake;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Getter
public class UserRecIntakeResponse {
    Long userRecIntakeId;
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

    @Builder
    public UserRecIntakeResponse(UserRecIntake userRecIntake, List<Nutrition> nutritionList) {
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
        this.nutritionsList = new ArrayList<>();
        for (Nutrition nutrition : nutritionList) {
            Nutritions nutritions = new Nutritions(nutrition);
            this.nutritionsList.add(nutritions);
        }
    }
}
