//Import Dependencies
const express = require('express');
const app = express();
const server = app.listen(3000);
const io = require('socket.io').listen(server);

//const http = require('http').createServer(app);
//const io = require('socket.io')(http);
const path = require('path');

//var {Mongoclient, ObjectID} = require('mongodb');

// players class
/*
    addplayer
        host id
        player id
        name
        game data
    removeplayer
        player id // id is the key id in database
    getplayer
        player id
    getallplayer
        host id
*/
// Games class
/*
    add game
        host id
        game code
    remove game
        host id
    findgame
        host id
*/
app.get('/', function (req, res) {
    res.sendFile(path.resolve('../public/index.html'));
});

const publicPath = path.join(__dirname, '../public');
app.use(express.static(publicPath));

var playername = [];

var arrayOfQuizes = []; // Global 
var index = 0;
io.sockets.on('connection', function (socket) {

    // Someone joined host page
    socket.on('host-join', function (data) {
        console.log('host joined');
        // Connect to a mongodb
        /*
        MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, client) => {
            if(err){
                return console.log('Unable to connnect to MonogDB server');
            }
            console.log('Connected to mongodb server');
            //var obj = new ObjectID();
            //console.log(obj)
            var db = client.db('GameDB');
            var list = { _id: parseInt(data.id)};
            db.collection('Games').find(list).toArray((err, gamesArray)=>{
                if(err){
                    return console.log('error for finding list of games');
                }
                if(gamesArray[0]!==undefined){
                    // code = Generate a random code for the game
                    // Add game to the games object
                    // Get game from games object based on the socket.id
                    // socket.join(game.code);
                    // emit game code to host in order to be displayed
                    
                    socket.emit('show-code',{
                        code: game.code
                    });
                }else {
                    socket.emit('game-not-found');       
                }
            });
            client.close();
        });*/
    });
    // Someone joined as a player with a name and a game code
    socket.on('player-join', function (data) { // data passed in the url
        //console.log(data.playerName);
        //console.log(data.gameCode);
        console.log(data.name);
        console.log(data.code);
        playername.push(data.name);
        socket.broadcast.emit('update-player-list', playername);
    });
    // Host started the game and joined players
    socket.on('start-game', function () {
        io.emit('game-started')
        io.emit('nn');

    });
    // Host join the game from /host/game 
    socket.on('host-join-game', function (data) {

    });
    // Player joined the game from player/game
    socket.on('player-join-game', (data) => {

    });
    // Player choses an answer
    socket.on('answer', function (answerChosen) {

    });
    // Host moved to second question
    socket.on('next-question', function (data) {
        var currentQuiz = arrayOfQuizes[0];
        currentQuestionObj = currentQuiz['questions'][index];    

        var questionObj = {
            "answers": currentQuestionObj['answers'],
            "question": currentQuestionObj['question'],
        }
        io.emit('nn', questionObj);
        index++;
    });
    // Host create a new quiz
    socket.on('new-quiz', function (quiz) {
        console.log("New quiz sent to server " + quiz.ip);
        //console.log(quiz);
        arrayOfQuizes.push(quiz);
        console.log(arrayOfQuizes);
        /*
        for (let index = 0; index < arrayOfQuizes.questions.length; index++) {
            var currentQuestion = quiz.questions[index];
            var ans = window.prompt(currentQuestion['question'] + "\n" + currentQuestion['answers'].join("\n"));
            alert(ans == currentQuestion['answers'][parseInt(currentQuestion['correct'])-1]);
        }*/
        // quiz {
        //"title": quiz,
        //"questions": arrayQuestions[ question: q
        // answers: [a1,a2,a3,a4]
        // correct: correct]
        //}
        // Add questions to data-base
        // 
        // And start quiz
        socket.emit('quiz-newly-created', quiz);
        console.log("New quiz sent to server " + quiz.ip);

    });
    // Show score
    socket.on('show-score', function (players) {

    });
});
/*
http.listen(3000, function (port){
    console.log("listening on port 3000");
});
*/
