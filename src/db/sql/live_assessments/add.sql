with results as (
    INSERT INTO ${schema~}.${live_assessments~}("id","assessment_uuid","pin")
    VALUES (DEFAULT, ${assessment_uuid}, ${pin})
    RETURNING assessment_uuid, pin
) SELECT assessment_uuid, pin FROM results