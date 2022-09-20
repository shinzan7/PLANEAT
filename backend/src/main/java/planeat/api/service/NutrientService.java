package planeat.api.service;
/*
 *
 @author 신지한
 @since 2022-09-15
*/
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import planeat.database.repository.NutrientRepository;

import javax.transaction.Transactional;

@Service
@RequiredArgsConstructor
@Transactional
public class NutrientService {

    private final NutrientRepository nutrientRepository;
}
