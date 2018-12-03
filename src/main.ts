import { NestFactory } from '@nestjs/core';

import { WsAdapter } from '@nestjs/websockets/adapters';
import { AppModule } from './app.module';
import { join } from 'path';

import express = require('express');
import session = require('express-session');
const pgSession = require('connect-pg-simple')(session);
import { pgp, db } from './db/index';
import helmet = require('helmet');

const socketio = require('socket.io');
var io;

const server = express();
require('dotenv').config();

server.set('trust proxy', 1) //https://github.com/expressjs/session see "cookie.secure"
server.disable('etag');
server.use(helmet.xssFilter());
server.use(helmet.noSniff());
server.use(helmet.frameguard());
server.use(helmet.ieNoOpen());
server.use(helmet.hidePoweredBy());

server.use(session({
    store: new pgSession({
        pgPromise: db,
        tableName: 'session',
        conString: 'postgres://'
            + process.env.PGUSER + ':'
            + process.env.PGPASSWORD + '@'
            + process.env.DB_HOST + ':'
            + process.env.PGPORT + '/' + process.env.PGDATABASE,
    }),
    secret: process.env.SESSION_COOKIE_SECRET,
    proxy: true,
    resave: false,
    saveUninitialized: true,
    cookie: {
        secure: true,
        maxAge: 60 * 60 * 1000  // 1 hour
    }
}));


async function bootstrap() {
    const app = await NestFactory.create(AppModule, server);
    app.use(function (req, res, next) {

        // Website you wish to allow to connect
        res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8080');
        res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4350');
        res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    
        // Request methods you wish to allow
        res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    
        // Request headers you wish to allow
        res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    
        // Set to true if you need the website to include cookies in the requests sent
        // to the API (e.g. in case you use sessions)
        res.setHeader('Access-Control-Allow-Credentials', true);
    
        // Pass to next layer of middleware
        next();
    });








    app.useStaticAssets(join(__dirname, "..", "public"));
    app.setBaseViewsDir(join(__dirname, "..", "views"));
    app.setViewEngine('hbs');

    app.useWebSocketAdapter(new WsAdapter(app.getHttpServer()));
    
    io = socketio.listen(await app.listen(4350));

    var playername = [];
    io.sockets.on('connection', function(socket) {

        // Someone joined host page
        socket.on('host-join', function (data) {
            console.log('host joined');

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

        });
        // Host join the game from /host/game 
        socket.on('host-join-game', function (data) {

        });
        // Player joined the game from player/game
        socket.on('player-join-game', (data)=> {
            
        });
        // Player choses an answer
        socket.on('answer', function(answerChosen){

        });
        // Host moved to second question
        socket.on('next-question', function (data) {

        });
        // Host create a new quiz
        socket.on('new-quiz', function (quiz) {
            console.log("New quiz sent to server " + quiz.ip);
            // And start quiz
            socket.emit('quiz-newly-created', quiz);
            console.log("New quiz sent to server " + quiz.ip);

        });
        // Show score
        socket.on('show-score', function(players){

        });
    });
}


bootstrap();