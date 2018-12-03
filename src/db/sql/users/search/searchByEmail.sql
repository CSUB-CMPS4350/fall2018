SELECT
    u.user_name,
    u.email
FROM
    ${users~} u
WHERE
    u.email ~ ${email};