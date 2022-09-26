package planeat.database.repository;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import planeat.database.entity.UserNutrient;

import javax.transaction.Transactional;

import java.util.List;

import static org.junit.jupiter.api.Assertions.*;
@SpringBootTest
@Transactional
class UserNutrientRepositoryTest {

    @Autowired
    private UserNutrientRepository userNutrientRepository;

    @Test
    public void test(){
        List<UserNutrient> allByUserId = userNutrientRepository.findAllByUserId(1L);

        System.out.println("=======================");
        for (UserNutrient u : allByUserId){
//            System.out.println(u.getNutrient().getNutrientName());
            System.out.println(u.getIntakeRecommend());
        }
        System.out.println("=======================");
    }

}