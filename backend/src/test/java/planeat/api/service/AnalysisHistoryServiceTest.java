package planeat.api.service;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.transaction.annotation.Transactional;
import planeat.database.entity.FoodInfo;
import planeat.database.entity.Ingredient;
import planeat.database.repository.FoodInfoRepository;
import planeat.database.repository.IngredientRepository;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
@SpringBootTest
@Transactional
class AnalysisHistoryServiceTest {

    @Autowired
    AnalysisHistoryService analysisHistoryService;
    @Autowired
    FoodInfoRepository foodInfoRepository;

    @Autowired
    IngredientRepository ingredientRepository;

    @Test
    void addFood() {
        FoodInfo foodInfo = foodInfoRepository.findById(1L).get();
        BigDecimal amount = BigDecimal.valueOf(2);
        analysisHistoryService.addFood(11L, LocalDate.now(),foodInfo, amount);
        analysisHistoryService.removeFood(11L, LocalDate.now(),foodInfo, amount);
        amount = BigDecimal.valueOf(12);
        analysisHistoryService.addFood(11L, LocalDate.now(),foodInfo, amount);

    }
}