package planeat.database.repository;

/*
 *
 * UserCategoryInfoRespository
 *
 @author 박윤하
 @since 2022-09-28
*/

import org.springframework.data.jpa.repository.JpaRepository;
import planeat.database.entity.UserCategoryInfo;

public interface UserCategoryInfoRepository extends JpaRepository<UserCategoryInfo, Long> {
}
