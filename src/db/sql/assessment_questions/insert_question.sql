INSERT INTO
    assessment_questions
    (assessment_id, question_text, correct_response_id)
VALUES
    ({assesment_id~}, {question_text~}, {correct_response_id~})
RETURNING
    id, assessment_id
