SELECT
    name,
    description,
    uuid_ as uuid,
    json_structure
FROM
    ${schema~}.${assessments~};