package planeat.database.entity;

/*
 *
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
import planeat.enums.Gender;

import javax.persistence.*;

import java.util.ArrayList;

import static javax.persistence.FetchType.LAZY;

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


    // 매핑관계 테이블 작성해야 함 OneToMany
    // 유저 권장섭취량 테이블, 유저 영양제 테이블, 분석 기록, 섭취 기록, 내 식단
//    @JsonIgnore
//    @OneToMany(cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.LAZY, mappedBy = "user")
//    List<UserNutirition> nutritionHistories = new ArrayList<>();


    @Builder
    public User(Long id, String name, String email, String provider, Integer birthyear, Gender gender) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.provider = provider;
        this.birthyear = birthyear;
        this.gender = gender;
    }


    public void setName(String name) {
        this.name = name;
    }
    public void setEmail(String email) {
        this.email = email;
    }
    public void setProvider(String provider) { this.provider = provider; }
    public void setBirthyear(Integer birthyear) { this.birthyear = birthyear; }
    public void setGender(Gender gender) { this.gender = gender; }
    public void setRefreshToken(String refreshToken) {
        this.refreshToken = refreshToken;
    }


    public User update(String name, String email) {
        this.name = name;
        this.email = email;
        return this;
    }


    // DTO 만들고 set 해서 response 반환하는 녀석 추가해야함

}
