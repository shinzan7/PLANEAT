package planeat.database.entity;

/*
 * 유저 엔티티
 * User - user table entity
 *
 @author 박윤하
 @since 2022-09-13
*/

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.DynamicUpdate;
import planeat.api.dto.user.UserInfoRequest;
import planeat.enums.Gender;

import javax.persistence.*;

import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@DynamicUpdate
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Table(name = "user")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "user_id")
    private Long id;

    @Column(name = "name", nullable = false)
    private String name;

    @Column(name = "email", nullable = false)
    private String email;

    @Column(name = "provider", nullable = false)
    private String provider;

    @Column(name = "birthyear")
    private Integer birthyear;

    @Enumerated(EnumType.STRING)
    @Column(name = "gender")
    private Gender gender;

    @Column(name = "refresh_token", unique = true)
    private String refreshToken;


    @JsonIgnore
    @OneToMany(cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.LAZY, mappedBy = "user")
    List<UserRecIntake> userRecIntakeList = new ArrayList<>();

    @JsonIgnore
    @OneToMany(cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.LAZY, mappedBy = "user")
    List<MyDiet> myDietList = new ArrayList<>();

    @JsonIgnore
    @OneToMany(cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.LAZY, mappedBy = "user")
    List<IntakeHistory> intakeHistoryList = new ArrayList<>();

    @JsonIgnore
    @OneToMany(cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.LAZY, mappedBy = "user")
    List<AnalysisHistory> analysisHistoryList = new ArrayList<>();

    @JsonIgnore
    @OneToMany(cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.LAZY, mappedBy = "user")
    List<UserCategory> userCategoryList = new ArrayList<>();

    @JsonIgnore
    @OneToMany(cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.LAZY, mappedBy = "user")
    List<UserNutrient> userNutrientList = new ArrayList<>();


    @Builder
    public User(Long id, String name, String email, String provider, Integer birthyear, Gender gender) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.provider = provider;
        this.birthyear = birthyear;
        this.gender = gender;
    }


    public void setRefreshToken(String refreshToken) {
        this.refreshToken = refreshToken;
    }


    public User update(String name, String email) {
        this.name = name;
        this.email = email;
        return this;
    }


    public static User updateUser(Long userId, UserInfoRequest userInfoRequest) {
        User user = User.builder()
                .id(userId)
                .birthyear(userInfoRequest.getBirthyear())
                .gender(userInfoRequest.getGender())
                .build();
        return user;
    }

}
