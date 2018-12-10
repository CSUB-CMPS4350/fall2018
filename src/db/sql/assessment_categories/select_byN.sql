SELECT
  categories.name as name,
  categories.description as description,
  categories.id as category_id,
  categories_rows.row as row
FROM
  assessment_categories categories
JOIN (
    SELECT
      ROW_NUMBER() OVER (ORDER BY name) AS row,
      id
    FROM
      assessment_categories
) as categories_rows
ON categories_rows.id = categories.id
WHERE
  row >= (4 * ${page}) + 1
  AND row <= 4 * (${page} + 1)

