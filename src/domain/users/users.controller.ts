import { Controller, Post, Param, Body, FileFieldsInterceptor, Inject, forwardRef } from '@nestjs/common';
import { SecurityService } from 'util/security.service';
import { create } from 'domain';
import { reject } from 'bluebird';
import { pgp } from 'db';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersService } from './users.service';
import { CreateGuestDto } from './dto/create-guest.dto';
import { AuthService } from '../auth/auth.service';
import { db } from '../../db/index';

@Controller('users')
export class UsersController {
    constructor(
        private readonly usersService: UsersService,
        private readonly security: SecurityService
    ) {}

    @Post('register')
    create(@Body() user: CreateUserDto) {
        var crypto_values = {
            salt: "",
            secret: ""
        };

        var all_values = {};
        let that = this;

        return new Promise(function (resolve, reject) {
            that.security.getSalt(16)
            .then(salt => {
                crypto_values.salt = salt.toString();
                return that.security.hashPassword(user.password, crypto_values.salt);
            }).then(result => {
                crypto_values.secret = result.toString();
                Object.assign(user, crypto_values);
                console.log(user);
                
                return db.users.add(user);
            }).then(result => {
                resolve(result);
            }).catch(error => {
                reject(error);
            });
        });
    }


    @Post('verify')
    verify(@Body() user: CreateUserDto) {
        let salt = db.users.get({
            fieldToReturn: 'hash',
            fieldToCheck: 'user_name',
            userValue: user.username
        })

        console.log(user.username + "'s salt: " + salt);
        let that = this;

        return new Promise(function (resolve, reject) {
            that.security.verifyPassword(salt, user.password)
                .then(result => {
                    console.log(result);
                    resolve(result);
                }).catch(error => {
                    reject(error);
                });
        })
    }

    @Post('search/email')
    search(@Body() user: CreateUserDto) {
        return this.usersService.searchByEmail(user);
    }

}
