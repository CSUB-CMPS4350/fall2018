import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { join } from 'path';

import express = require('express');
import helmet = require('helmet');

const server = express();

server.set('trust proxy', 1) //https://github.com/expressjs/session see "cookie.secure"
server.disable('etag');
server.use(helmet.xssFilter());
server.use(helmet.noSniff());
server.use(helmet.frameguard());
server.use(helmet.ieNoOpen());
server.use(helmet.hidePoweredBy());

/*server.use(session( {
  store: new pgSession({
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

  app.useStaticAssets(join(__dirname, "..", "public"));
  app.setBaseViewsDir(join(__dirname, "..", "views"));
  app.setViewEngine('hbs');
  

  await app.listen(4350);
}
bootstrap();
