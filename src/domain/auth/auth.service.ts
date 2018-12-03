import { JwtService } from '@nestjs/jwt';
import { Injectable, Body, Inject, forwardRef } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { Session } from 'inspector';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { JwtPayload } from './dto/jwt-payload.dto';
import { CreateGuestDto } from '../users/dto/create-guest.dto';
import { JwtGuestPayload } from './dto/jwt-guest-payload.dto';

@Injectable()
export class AuthService {
  constructor(
    @Inject(forwardRef(() => UsersService))
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService
  ) { }

  async validateUser(payload: JwtPayload): Promise<any> {
    // Validate if token passed along with HTTP request
    // is associated with any registered account in the database
    return await this.usersService.findOneByEmail(payload.email);
  }

  async signJwt(user: CreateUserDto) {
    const _user: JwtPayload = { email: user.email };
    var jwt = this.jwtService.sign(_user);
    console.log(jwt);
    return jwt;
  }

  async signGuestJwt(guest: CreateGuestDto, uuid: string) {
    const _guest: JwtGuestPayload = { tag: guest.tag, assessment_uuid: uuid };
    var jwt = this.jwtService.sign(_guest);
    console.log("Guest["+guest.tag+"] jwt: "+jwt);
    return jwt;
  }

  signIn = (user: CreateUserDto) => this.usersService.verifyUser(user)
    .then(result => {
      console.log("User: "+user.username);
      console.log(result);
      if (result) {
        console.log("signing user");
        return this.signJwt(user);
      }
      else {
        console.log("invalid");
        return "Invalid username or password"
      }
    }).then(response => {
      return response;
    }).catch(error => {
      return error;
    });
}