SELECT
    uuid_ as uuid
FROM
    ${assessments~}
WHERE
    ${fieldToCheck~} = ${userValue}