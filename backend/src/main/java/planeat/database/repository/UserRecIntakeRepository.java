package planeat.database.repository;

/*
 *
 * UserRecIntakeRepository
 *
 @author 박윤하
 @since 2022-09-23
*/

import org.springframework.data.jpa.repository.JpaRepository;
import planeat.database.entity.User;
import planeat.database.entity.UserRecIntake;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

public interface UserRecIntakeRepository extends JpaRepository<UserRecIntake, Long> {

    List<UserRecIntake> findByUserOrderByUpdateDateAsc(User user);

    Optional<UserRecIntake> findFirstByUpdateDate(LocalDate updateDate);

    Optional<UserRecIntake> findFirstByUserOrderByUpdateDateDesc(User user);

    Optional<UserRecIntake> findFirstByUserOrderByUpdateDateAsc(User user);

    Optional<UserRecIntake> findFirstByUserAndUpdateDateLessThanEqualOrderByUpdateDateDesc(User user, LocalDate updateDate);

}
