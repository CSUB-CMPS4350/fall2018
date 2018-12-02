import { Get, Controller, Render } from '@nestjs/common';
import { Socket } from 'dgram';

@Controller()
export class AppController {
  @Get()
  @Render('index')
  root() {
    return { message: 'CMPS 4350'}
  }

  @Get('testAnimation')
  @Render('testAnimation')
  test() {
    return { title: 'Eduardo\'s Animation' };
  }

  @Get('bubbles')
  @Render('bubbles')
  bubbles() {
    return;
  }

  @Get('socket')
  @Render('socket')
  Socket() {
    return;
  }

  @Get('csub')
  @Render('csub')
  csub() {
    return;
  }

  @Get('login')
  @Render('login')
  login() {
    return;
  }

  @Get('dashboard')
  @Render('dashboard')
  dashboard() {
    return;
  }

  @Get('begin')
  @Render('begin')
  begin() {
    return;
  }

  @Get('quiz')
  @Render('quiz')
  quiz() {
    return;
  }
}
