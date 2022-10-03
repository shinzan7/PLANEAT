package planeat.database.repository;

/*
 *
 * UserRecIntakeRepository
 *
 @author 박윤하
 @since 2022-09-23
*/

import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import planeat.database.entity.User;
import planeat.database.entity.UserRecIntake;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

public interface UserRecIntakeRepository extends JpaRepository<UserRecIntake, Long> {

    @Query("select u from UserRecIntake u where u.user.id = :userId order by u.updateDate")
    List<UserRecIntake> findByUserId(@Param("userId") Long userId);

    Optional<UserRecIntake> findFirstByUserOrderByUpdateDateAsc(User user);

    Optional<UserRecIntake> findFirstByUserAndUpdateDateLessThanEqualOrderByUpdateDateDesc(User user, LocalDate updateDate);

}
