package planeat.api.dto.user;

/*
 *
 * UserInfoResponse
 *
 @author 박윤하
 @since 2022-09-26
*/

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
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
import java.util.ArrayList;
import java.util.List;

@Getter
@ApiModel(value = "유저 정보(관심 건강, 권장섭취량)", description = "유저 정보(관심 건강, 권장섭취량) 조회에 대한 응답")
public class UserInfoResponse {

    @ApiModelProperty(value = "조회할 유저 Id", example = "3")
    private Long userId;

    @ApiModelProperty(value = "유저 이름", example = "박윤하")
    private String name;

    @ApiModelProperty(value = "유저 태어난 연도", example = "1998")
    private Integer birthyear;

    @ApiModelProperty(value = "유저 성별(남: M, 여: F)", example = "F")
    @Enumerated(EnumType.STRING)
    private Gender gender;

    @ApiModelProperty(value = "유저 권장섭취량 정보")
    private RecInfo recInfo;

    @ApiModelProperty(value = "유저 관심 건강 정보 목록")
    private List<String> categoriesList;

    @Getter
    @Setter
    @NoArgsConstructor
    @ApiModel(value = "유저 권장섭취량 정보", description = "유저 권장섭취량 정보 조회에 대한 응답")
    static public class RecInfo {

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
            this.nutritionsList = new ArrayList<>();
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
