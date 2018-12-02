var chosen_assessment = {
    pin: '',
    uuid: ''
};

var begin_enabled = false;
const socket = new WebSocket('ws://localhost:8080');
socket.onopen = function () {
    console.log('WebSocket connected');
    socket.send(JSON.stringify({
        event: 'events',
        data: 'test',
    }));
    socket.onmessage = function (data) {
        console.log(data);
    }
};

$(document).ready(function () {
    var table = $('#assessments_table').DataTable({

        "scrollY": "200px",
        "scrollCollapse": true,
        "paging": false,
        "processing": false,
        "serverSide": true,
        "ajax": {
            "url": "assessments/all",
            "type": "POST"
        },
        "columns": [
            { "data": "name" },
            { "data": "description" },
            { "data": "uuid" },
        ],
        "columnDefs": [
            {
                "targets": [2],
                "visible": false,
                "searchable": false
            }
        ]
    });

    $('#assessments_table tbody').on('click', 'tr', function () {
        var data = table.row(this).data();
        if (!begin_enabled) {
            $('#btn_start').removeClass("disabled")
        }
        console.log(data);
        chosen_assessment.uuid = data.uuid;
    })

    $('#btn_start').on('click', function (e) {
        e.preventDefault();
        $.ajax({
            url: '/assessments/start_assessment',
            type: 'post',
            data: {
                assessment_uuid: chosen_assessment.uuid
            },
            success: function (response) {
                //whatever you wanna do after the form is successfully submitted
                console.log(response);
                $('#pin').text("Pin: " + response.pin);
                $('#users').text("Connected users: 0");
            }
        });
    })
});