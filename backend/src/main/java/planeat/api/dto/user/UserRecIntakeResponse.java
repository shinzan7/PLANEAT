package planeat.api.dto.user;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Builder;
import lombok.Getter;
import org.springframework.format.annotation.DateTimeFormat;
import planeat.database.entity.Nutrition;
import planeat.database.entity.UserRecIntake;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Getter
@ApiModel(value = "유저 권장섭취량 정보", description = "유저 권장섭취량 및 필수 영양소 정보 조회에 대한 응답")
public class UserRecIntakeResponse {

    @ApiModelProperty(value = "유저 권장섭취량 Id", example = "2")
    Long userRecIntakeId;

    @ApiModelProperty(value = "유저 권장 섭취량 조회 날짜", example = "2022-09-28")
    @DateTimeFormat(pattern = "yyyy-MM-dd")
    LocalDate updateDate;

    @ApiModelProperty(value = "유저 키", example = "168.2")
    BigDecimal height;

    @ApiModelProperty(value = "유저 몸무게", example = "50.1")
    BigDecimal weight;

    @ApiModelProperty(value = "유저 BMI", example = "18.1")
    BigDecimal bmi;

    @ApiModelProperty(value = "유저 활동량", example = "1.0")
    BigDecimal active;

    @ApiModelProperty(value = "유저 권장 칼로리", example = "2100.2")
    Float calorie;

    @ApiModelProperty(value = "유저 권장 탄수화물", example = "1000.4")
    Float carbohydrate;

    @ApiModelProperty(value = "유저 권장 단백질", example = "500.3")
    Float protein;

    @ApiModelProperty(value = "유저 권장 지방", example = "30.8")
    Float fat;

    @ApiModelProperty(value = "필수 영양소 목록")
    List<Nutritions> nutritionsList;

    @Getter
    @ApiModel(value = "유저 필수 영양소 정보", description = "유저 필수 영양소 정보 조회에 대한 응답")
    static public class Nutritions {

        @ApiModelProperty(value = "필수 영양소 이름", example = "비타민C")
        String nutri_type;

        @ApiModelProperty(value = "필수 영양소 단위", example = "mg")
        String nutri_unit;

        @ApiModelProperty(value = "필수 영양소 권장 섭취량", example = "100.00")
        BigDecimal intake_rec;

        @ApiModelProperty(value = "필수 영양소 상한 섭취량", example = "2000.00")
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
