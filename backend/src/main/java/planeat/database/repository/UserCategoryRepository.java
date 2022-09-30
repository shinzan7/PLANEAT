package planeat.database.repository;

/*
 *
 * UserCategoryRepository
 *
 @author 박윤하
 @since 2022-09-26
*/

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import planeat.database.entity.UserCategory;

import java.util.List;

public interface UserCategoryRepository extends JpaRepository<UserCategory, Long> {

    @Query("select u from UserCategory u where u.user.id = :userId")
    List<UserCategory> findAllByUserId(@Param("userId") Long userId);

}
