package planeat.api.dto.analysishistory;

import lombok.Data;

import java.io.Serializable;
import java.time.LocalDate;

/**
 * A DTO for the {@link planeat.database.entity.AnalysisHistory} entity
 */
@Data
public class AnalysisHistoryRequest implements Serializable {
    private final Long userId;
    private final LocalDate date;

    private final Float calorie;
    private final Float protein;
    private final Float fat;
    private final Float carbohydrate;
    private final Float sugar;

    private final Float dietary_fiber;
    private final Float calcium;
    private final Float iron;
    private final Float magnesium;
    private final Float phosphorus;

    private final Float potassium;
    private final Float sodium;
    private final Float zinc;
    private final Float copper;
    private final Float manganese;

    private final Float selenium;
    private final Float vitaminA;
    private final Float vitaminD;
    private final Float vitaminB6;
    private final Float folate;

    private final Float vitaminB12;
    private final Float vitaminC;
    private final Float cholesterol;
    private final Float fattyAcid;
    private final Float linoleicAcid;

    private final Float alphaLinoleicAcid;
    private final Float transFattyAcid;
    private final Float vitaminB1;
    private final Float vitaminB2;
}