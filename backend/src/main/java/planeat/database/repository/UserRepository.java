package planeat.database.repository;

/*
 *
 * UserRepository
 *
 @author 박윤하
 @since 2022-09-15
*/

import org.springframework.data.jpa.repository.JpaRepository;
import planeat.database.entity.User;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {

    Optional<User> findByEmailAndProvider(String email, String provider);

    Optional<User> findById(Long id);

}
