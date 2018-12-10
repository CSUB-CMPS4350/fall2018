var qnum = 0;
function addQuestion() {
    qnum++;
    var oldDiv = document.getElementById('questions');
    var newDiv = document.createElement('div');

    oldDiv.appendChild(document.createElement('br'));
    var questionLa = document.createElement('label');
    var questionin = document.createElement('input');

    var correctLa = document.createElement('label');
    var correctin = document.createElement('select');

    questionLa.innerHTML = 'Question ' + qnum.toString();
    questionin.setAttribute('class', 'question');
    questionin.setAttribute('id', 'q' + qnum.toString());
    questionin.setAttribute('type', 'text');

    newDiv.appendChild(questionLa);
    newDiv.appendChild(questionin);
    newDiv.appendChild(document.createElement('br'));

    for (var i = 1; i <= 4; i++) {
        var label = document.createElement('label');
        var input = document.createElement('input');

        label.innerHTML = "Answer " + i.toString();
        label.setAttribute('for', 'q' + qnum.toString() + 'a' + i.toString());
        input.setAttribute('id', 'q' + qnum.toString() + 'a' + i.toString());
        input.setAttribute('type', 'text');
        input.setAttribute('class', 'form-control');
        newDiv.appendChild(label);
        newDiv.appendChild(input);

        var option = document.createElement('option');
        option.innerHTML = "Answer " + i;
        option.setAttribute('value', i);
        correctin.appendChild(option);
    }
    correctLa.innerHTML = "Correct Answer ";
    correctLa.setAttribute('for', 'correct' + qnum.toString());
    correctin.setAttribute('id', 'correct' + qnum.toString());
    correctin.setAttribute('class', 'form-control');

    newDiv.appendChild(correctLa);
    newDiv.appendChild(correctin);
    newDiv.appendChild(document.createElement('br'));

    oldDiv.appendChild(newDiv);

    newDiv.setAttribute('id', 'questions');
    var totalQuestions = document.getElementById("total-questions");
    totalQuestions.innerHTML = "Total questions: " + qnum;
}

function updateQuestiondb() {
    var arrayQuestions = [];
    for (var i = 1; i <= qnum; i++) {
        var q = document.getElementById('q' + i).value;
        var a1 = document.getElementById('q' + i + 'a1').value;
        var a2 = document.getElementById('q' + i + 'a2').value;
        var a3 = document.getElementById('q' + i + 'a3').value;
        var a4 = document.getElementById('q' + i + 'a4').value;
        var correct = document.getElementById('correct' + i).value;
        arrayQuestions.push({
            "question": q,
            "answers": [a1, a2, a3, a4],
            "correct": correct,
        })
    }
    var title = document.getElementById('quizTitleInput').value;
    var desc = document.getElementById('quizDescriptionInput').value;
    var quiz = {
        "title": title,
        "description": desc,
        "questions": arrayQuestions,
        ip: socket.id
    };
    socket.emit('new-quiz', JSON.stringify(quiz));
    console.log(quiz);
}

$(document).ready(function () {


    $('#create_quiz').on('click', function (e) {
        e.preventDefault();
        var arrayQuestions = [];
        for (var i = 1; i <= qnum; i++) {
            var q = document.getElementById('q' + i).value;
            var a1 = document.getElementById('q' + i + 'a1').value;
            var a2 = document.getElementById('q' + i + 'a2').value;
            var a3 = document.getElementById('q' + i + 'a3').value;
            var a4 = document.getElementById('q' + i + 'a4').value;
            var correct = document.getElementById('correct' + i).value;
            arrayQuestions.push({
                "question": q,
                "answers": [a1, a2, a3, a4],
                "correct": correct,
            })
        }
        $.ajax({
            url: '/assessments/new',
            type: 'post',
            data: {
                name: document.getElementById('quizTitleInput').value,
                description: document.getElementById('quizDescriptionInput').value,
                json_structure: arrayQuestions
            },
            success: function (response) {
                //whatever you wanna do after the form is successfully submitted
                console.log(response);
            }
        });

    })
});