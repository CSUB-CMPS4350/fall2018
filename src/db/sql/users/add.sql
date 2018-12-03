/*
    Inserts a new user record.
*/
with results as (
    INSERT INTO ${schema~}.${users~}("id","user_name","hash","email","uuid4","salt")
    VALUES (DEFAULT, ${username}, ${secret}, ${email}, DEFAULT, ${salt}) RETURNING uuid4
) SELECT uuid4 FROM results