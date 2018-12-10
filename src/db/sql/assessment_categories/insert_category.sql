INSERT INTO
  assessment_categories (name, description)
VALUES
  ('Algorithms', 'Hard Stuff' )
RETURNING
  id, name, description