SELECT
    assessment_uuid as uuid
FROM
    ${live_assessments~}
WHERE
    ${fieldToCheck~} = ${userValue}