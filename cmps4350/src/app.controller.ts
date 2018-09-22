import { Get, Controller, Render } from '@nestjs/common';

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

}
