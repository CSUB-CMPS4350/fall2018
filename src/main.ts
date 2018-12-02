import { NestFactory } from '@nestjs/core';

import { WsAdapter } from '@nestjs/websockets/adapters';
import { AppModule } from './app.module';
import { join } from 'path';

import express = require('express');
import session = require('express-session');
const pgSession = require('connect-pg-simple')(session);
import { pgp, db } from './db/index';
import helmet = require('helmet');

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
/*server.use(session( {
  store: new pgSession({}
      pool: pgp.pg,
      tableName: 'user_session',
      conString: 'postgres://'
      +process.env.PGUSER+':'
      +process.env.PGPASSWORD+'@'
      +process.env.DB_HOST+':'
      +process.env.PGPORT+'/'+process.env.PGDATABASE,
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
*/
async function bootstrap() {
    const app = await NestFactory.create(AppModule, server);
    app.use(function (req, res, next) {

        // Website you wish to allow to connect
        res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8080');
        res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4350');
    
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


    await app.listen(4350);
}
bootstrap();
