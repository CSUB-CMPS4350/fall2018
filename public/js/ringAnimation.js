
var myAnimationPiece = [];
var maxBubbles = 20;

/*
$("#bigbutton").on("click", function(){
// what to do when clicked
//alert("I was clicked!");

});
*/

function startAnimation() {

    var bubbleColor;
    var randomNum;

    for (var i = 0; i < maxBubbles; i++) {
        randomNum = Math.floor((Math.random()*3)+1);

        if(randomNum == 1) {
            bubbleColor = "red";
        } else if(randomNum == 2) {
            bubbleColor = "blue";
        } else {
            bubbleColor = "green";
        }

        myAnimationPiece[i] = new component(Math.random()*window.innerWidth, 
                window.innerHeight, 80, 0, 2*Math.PI, bubbleColor);
    }

    myAnimationArea.start();
}

var myAnimationArea = {
    canvas : document.createElement("canvas"),
    start : function() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        this.context = this.canvas.getContext("2d");
        document.body.insertBefore(this.canvas, document.body.childNodes[0]);
        this.interval = setInterval(updateAnimationArea, 20);        
    },
    stop : function() {
        clearInterval(this.interval);
    },    
    clear : function() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
}

function component(x,y,r,startangle,endangle,color,type) {
    this.type = type;
    this.x = x;
    this.y = y;
    this.r = r*Math.random();
    this.startangle = 0;
    this.endangle = 2*Math.PI;    
    this.speedX = 0;
    this.speedY = 0;    
    this.gravity = 0.05*Math.random();
    this.gravitySpeed = 0;
    this.color = color;
    this.opacity = 0.8*Math.random();
    this.update = function() {
        ctx = myAnimationArea.context;
        ctx.fillStyle = this.color;
        ctx.globalAlpha = this.opacity;
        ctx.beginPath();
        ctx.arc(this.x,this.y,this.r,0,2*Math.PI);
        ctx.fill();
        ctx.closePath();
    }
    this.setColor = function() {

        var randomNum = Math.floor((Math.random()*3)+1);

        if(randomNum == 1) {
            this.color = "red";
        } else if(randomNum == 2) {
            this.color = "blue";
        } else {
            this.color = "green";
        }

        this.opacity = 0.8*Math.random();
    }
    this.setCanvasSize = function() {
        if(this.canvas.width != window.innerWidth) {
            this.canvas.width = window.innerWidth;
        }
        if(this.canvas.height != window.innerHeight) {
            this.canvas.height = window.innerHeight;
        }
    }
    this.newPos = function() {
        this.gravitySpeed += this.gravity;
        this.x += this.speedX;
        this.y -= this.speedY + this.gravitySpeed;
    
        //if the bubble reaches the top
        if(this.y < 0) {
            this.gravitySpeed = 0;
            this.gravity = 0.05*Math.random();
            this.x = Math.random()*window.innerWidth;
            this.y = window.innerHeight;
            this.r = r*Math.random();
            this.setColor();
            //this.setCanvasSize();
        }
    }
}

function updateAnimationArea() {
    myAnimationArea.clear();
    for(var i = 0; i < maxBubbles; i++) {
        myAnimationPiece[i].newPos();
        myAnimationPiece[i].update();
    }
}

window.onload = startAnimation;

$(document).ready(function() {
    var socket = io('http://api.campuscode.host/');
    var id,
        player_name;

        $('#pin_input').modal()

    socket.on('connect', () => {
        id = socket.id;
        if (localStorage.id === undefined) {
            localStorage.id = id;
        }
        console.log(id);
    });

    socket.on('quiz-starting', () => {
        $('#quiz_starting').modal();
    });



    $('#btn_joinQuiz').click(function() {
        player_name = $('#gameNameInput').val().trim();
        localStorage.player_name = player_name;
        localStorage.uid = localStorage.id || localStorage.player_name;

        var data = {
            pin: $('#gamePinInput').val().trim(),
            name: $('#gameNameInput').val().trim(),
            id: id
        };

        socket.emit('join-quiz', function(data) {
            
        });
        $('#pin_input').modal('toggle');
    })


});