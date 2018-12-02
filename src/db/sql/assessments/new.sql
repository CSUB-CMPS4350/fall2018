with results as (
    INSERT INTO ${schema~}.${assessments~}("id","uuid_","name","description","json_structure")
    VALUES (DEFAULT, DEFAULT, ${name}, ${description}, ${json_structure})
    RETURNING uuid_
) SELECT uuid_ as uuid FROM results