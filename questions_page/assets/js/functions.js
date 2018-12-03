
//document.getEllementById('button1').addEventListener('click',function(e) {
//	console.log("button 1 was pressed");	
//}
var socket = io.connect("http://localhost:3000");

function button1() {
	socket.emit('chat message',"answer A was selected");
}
function button2() {
	socket.emit('chat message',"answer B was selected");
}

function button3() {
	socket.emit('chat message',"answer C was selected");
}

function button4() {
	socket.emit('chat message',"answer D was selected");
}
