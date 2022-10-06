package planeat.api.dto.user;

/*
 *
 * UserInfoRequest
 *
 @author 박윤하
 @since 2022-09-16
*/

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.*;
import org.springframework.format.annotation.DateTimeFormat;
import planeat.enums.Gender;

import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.validation.constraints.NotBlank;
import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@ApiModel(value = "유저 정보(관심 건강, 권장섭취량)", description = "유저 정보(관심 건강, 권장섭취량) 등록/수정에 대한 요청")
public class UserInfoRequest {

    @ApiModelProperty(value = "수정할 유저 Id - 등록 시에는 입력X", example = "3")
    private Long userId;

    @ApiModelProperty(value = "유저 이름", example = "박윤하", required = true)
    @NotBlank(message = "유저 이름 정보가 입력되지 않았습니다.")
    private String name;

    @ApiModelProperty(value = "유저 이메일", example = "ha110011@naver.com", required = true)
    @NotBlank(message = "유저 이메일 정보가 입력되지 않았습니다.")
    private String email;

    @ApiModelProperty(value = "유저 로그인 사이트", example = "Google", required = true)
    @NotBlank(message = "유저 로그인 사이트 정보가 입력되지 않았습니다.")
    private String provider;

    @ApiModelProperty(value = "유저 태어난 연도", example = "1998")
    private Integer birthyear;

    @ApiModelProperty(value = "유저 성별(남: M, 여: F)", example = "F")
    @Enumerated(EnumType.STRING)
    private Gender gender;

    @ApiModelProperty(value = "유저 권장섭취량 정보")
    private RecInfo recInfo;

    @ApiModelProperty(value = "유저 관심 건강 정보 목록")
    private List<Categories> categoriesList;

    @Getter
    @Setter
    @NoArgsConstructor
    @ApiModel(value = "유저 권장섭취량 정보", description = "유저 권장섭취량 정보 등록/수정에 대한 요청")
    static public class RecInfo {

        @ApiModelProperty(value = "유저 권장섭취량 Id - 등록 시에는 입력X", example = "2")
        Long userRecIntakeId;

        @ApiModelProperty(value = "유저 권장 섭취량 등록/수정 날짜", example = "2022-09-28", required = true)
        @NotBlank(message = "유저 권장섭취량의 날짜 정보가 입력되지 않았습니다.")
        @DateTimeFormat(pattern = "yyyy-MM-dd")
        LocalDate updateDate;

        @ApiModelProperty(value = "유저 키", example = "168.2", required = true)
        @NotBlank(message = "유저 권장섭취량의 키 정보가 입력되지 않았습니다.")
        BigDecimal height;

        @ApiModelProperty(value = "유저 몸무게", example = "50.1", required = true)
        @NotBlank(message = "유저 권장섭취량의 몸무게 정보가 입력되지 않았습니다.")
        BigDecimal weight;

        @ApiModelProperty(value = "유저 BMI", example = "18.1", required = true)
        @NotBlank(message = "유저 권장섭취량의 BMI 정보가 입력되지 않았습니다.")
        BigDecimal bmi;

        @ApiModelProperty(value = "유저 활동량", example = "1.0", required = true)
        @NotBlank(message = "유저 권장섭취량의 활동량 정보가 입력되지 않았습니다.")
        BigDecimal active;

        @ApiModelProperty(value = "유저 권장 칼로리", example = "2100.2", required = true)
        @NotBlank(message = "유저 권장섭취량의 칼로리 정보가 입력되지 않았습니다.")
        Float calorie;

        @ApiModelProperty(value = "유저 권장 탄수화물", example = "1000.4", required = true)
        @NotBlank(message = "유저 권장섭취량의 탄수화물 정보가 입력되지 않았습니다.")
        Float carbohydrate;

        @ApiModelProperty(value = "유저 권장 단백질", example = "500.3", required = true)
        @NotBlank(message = "유저 권장섭취량의 단백질 정보가 입력되지 않았습니다.")
        Float protein;

        @ApiModelProperty(value = "유저 권장 지방", example = "30.8", required = true)
        @NotBlank(message = "유저 권장섭취량의 지방 정보가 입력되지 않았습니다.")
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
    @ApiModel(value = "유저 관심 건강 정보", description = "유저 관심 건강 정보 등록/수정에 대한 요청")
    static public class Categories {

        @ApiModelProperty(value = "유저 Id", example = "2", required = true)
        @NotBlank(message = "유저 Id 정보가 입력되지 않았습니다.")
        Long userId;

        @ApiModelProperty(value = "유저 카테고리 정보 Id", example = "3", required = true)
        @NotBlank(message = "유저 카테고리 정보 Id가 입력되지 않았습니다.")
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
