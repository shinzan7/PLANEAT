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
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;
import planeat.api.dto.user.UserInfoRequest;
import planeat.enums.Gender;

import javax.persistence.*;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@DynamicUpdate
@EntityListeners(AuditingEntityListener.class)
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

    @CreatedDate
    @Column(name = "join_date")
    private LocalDate joinDate;

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
    public User(Long id, String name, String email, String provider, LocalDate joinDate, Integer birthyear, Gender gender) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.provider = provider;
        this.joinDate = joinDate;
        this.birthyear = birthyear;
        this.gender = gender;
    }


    public void setName(String name) {
        this.name = name;
    }

    public void setBirthyear(Integer birthyear) {
        this.birthyear = birthyear;
    }

    public void setGender(Gender gender) {
        this.gender = gender;
    }

    public void setRefreshToken(String refreshToken) {
        this.refreshToken = refreshToken;
    }

    public void setUserRecIntakeList(List<UserRecIntake> userRecIntakeList) {
        this.userRecIntakeList = userRecIntakeList;
    }

    public void setMyDietList(List<MyDiet> myDietList) {
        this.myDietList = myDietList;
    }

    public void setUserCategoryList(List<UserCategory> userCategoryList) {
        this.userCategoryList = userCategoryList;
    }

    public void setUserNutrientList(List<UserNutrient> userNutrientList) {
        this.userNutrientList = userNutrientList;
    }

    public User update(String email) {
        this.email = email;
        return this;
    }


    public static User updateUser(User user, UserInfoRequest userInfoRequest) {
        User newUser = user;
        newUser.setName(userInfoRequest.getName());
        newUser.setRefreshToken(user.getRefreshToken());
        newUser.setUserCategoryList(user.getUserCategoryList());
        newUser.setUserNutrientList(user.getUserNutrientList());
        newUser.setUserRecIntakeList(user.getUserRecIntakeList());
        newUser.setMyDietList(user.getMyDietList());
        newUser.setGender(userInfoRequest.getGender());
        newUser.setBirthyear(userInfoRequest.getBirthyear());
        return newUser;
    }

}
