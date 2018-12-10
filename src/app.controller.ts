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
  @Render('teacher_dashboard/dashboard')
  dashboard() {
    return;
  }

  @Get('begin')
  @Render('teacher_dashboard/begin')
  begin() {
    return;
  }

  @Get('quiz')
  @Render('teacher_dashboard/quiz')
  quiz() {
    return;
  }

  @Get('create_assessment')
  @Render('teacher_dashboard/create_assessment')
  create_assessment() {
    return;
  }

  @Get('game')
  @Render('ed_quiz.hbs')
  game() {
    return;
  }

}
