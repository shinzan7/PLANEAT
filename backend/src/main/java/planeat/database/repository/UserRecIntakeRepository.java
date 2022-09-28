package planeat.database.repository;

/*
 *
 * UserRecIntakeRepository
 *
 @author 박윤하
 @since 2022-09-23
*/

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import planeat.database.entity.UserRecIntake;

import java.time.LocalDate;
import java.util.Optional;

public interface UserRecIntakeRepository extends JpaRepository<UserRecIntake, Long> {

    Optional<UserRecIntake> findByUpdateDate(LocalDate updateDate);

    @Query("select u from UserRecIntake u where u.user.id = :userId and u.updateDate = :date")
    UserRecIntake findByUserIdAndDate(Long userId, LocalDate date);

}
