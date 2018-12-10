var chosen_assessment = {
    pin: '',
    uuid: ''
};

var begin_enabled = false;
var connected_users = 0;


$(document).ready(function () {
    /* QRCode stuff */
    var qrcode = new QRCode(document.getElementById("qrcode"), {
        width : 200,
        height : 200
    });

    var socket = io('http://api.campuscode.host/');
    // Player connected to the server
    socket.on('connect', () => {
    console.log('Hellooooo');

        var data = jQuery.deparam(window.location.search)
        socket.emit('player-join',data);
        
    });
    socket.on('player-joined-quiz', function(player)) {
        connected_users++;
        $('#users').text("Connected users: "+connected_users);
    }

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
        qrcode.makeCode('http://api.campuscode.host/game/'+chosen_assessment.pin);

    })

    $('#tst').on('click', function (e) {
        e.preventDefault();
        $.ajax({
            url: '/assessments/one',
            type: 'get',
            success: function (response) {
                console.log(response);
            }
        })
    })

});


