/*
    Inserts a new user record.
*/
with results as (
    INSERT INTO ${schema~}.${guest_users~}("id","tag","assessment_uuid","jwt")
    VALUES (DEFAULT, ${tag}, ${assessment_uuid}, ${jwt_value}) RETURNING jwt, assessment_uuid
) SELECT r.assessment_uuid, r.jwt FROM results r