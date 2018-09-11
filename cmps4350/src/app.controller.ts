import { Get, Controller, Render } from '@nestjs/common';

@Controller()
export class AppController {
  @Get()
  @Render('index')
  root() {
    return { message: 'Front Page Test!'}
  }

  @Get('testAnimation')
  @Render('testAnimation')
  test() {
    return;
  }

  @Get('bubbles')
  @Render('bubbles')
  bubbles() {
    return;
  }

}
