$(document).ready(function () {

    const socket = new WebSocket('ws://localhost:8080');
    socket.onopen = function () {
        console.log('Connected');
        socket.send(JSON.stringify({
            event: 'events',
            data: 'test',
        }));
        socket.onmessage = function (data) {
            console.log(data);
        }
    };



    $('#pin').on('click', function () {
        $('#btn_start').removeClass('disabled');
    });

    $('#btn_start').on('click', function() {
        socket.send(JSON.stringify({
            event: 'join_quiz',
            data: {
                pin: $('#pin').val(),
                tag: $('#tag').val()
            }
        }));

        socket.onmessage = function (response) {
            data = JSON.parse(response.data);
            if (data.jwt) {
                localStorage.quiz_guest_uuid = data.assessment_uuid;
                localStorage.quiz_guest_jwt = data.jwt;
                console.log(data);
            }
        }
    });

    socket.onclose = function() {
        socket.send(JSON.stringify({
            event: 'leave_quiz',
            data: {
                jwt: localStorage.quiz_guest_jwt
            }
        }));
    }
});