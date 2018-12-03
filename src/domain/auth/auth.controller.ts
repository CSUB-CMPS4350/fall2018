import { Controller, Body, Post } from '@nestjs/common';
import { UsersService } from 'domain/users/users.service';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { AuthService } from './auth.service';
import { reject } from 'bluebird';

@Controller('auth')
export class AuthController {
    constructor(
        private readonly usersService: UsersService,
        private readonly authService: AuthService
    ) {}

    @Post('signin')
    signIn(@Body() user: any) {
        console.log(user);
        return this.authService.signIn(user);
    }
}
