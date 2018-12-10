import { Injectable, Inject, forwardRef } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UserDto } from './dto/user.dto';
import { SecurityService } from 'util/security.service';
import { db } from '../../db/index';
import { JwtPayload } from '../auth/dto/jwt-payload.dto';

@Injectable()
export class UsersService {
    constructor(
        private readonly security: SecurityService
    ) {}

    findOneBySession(user: CreateUserDto) {
        return new Promise(function (resolve, reject) {

        });
    }

    findOneByEmail(email) {
        return new Promise(function(resolve, reject) {
            const user: JwtPayload = { email: email }
            db.users.searchByEmail(user).then(results => {
                resolve(results);
            }).catch(error => {
                reject(error);
            });
        });
    }

    searchByEmail = (user: CreateUserDto) =>
        db.users.searchByEmail(user).then(results => {
            return results;
        }).catch(error => {
            return error;
        });

    verifyUser(user: CreateUserDto) {
        var salt = "";
        var hash = "";

        let that = this;

        return new Promise(function (resolve, reject) {
            that.getValue(user.username, "user_name", "hash")
            .then(result => {
                hash = result["hash"];
                return that.getValue(user.username, "user_name", "salt");
            }).then(result => {
                salt = result["salt"];
                return that.security.verifyPassword(hash, user.password + salt);
            }).then(result => {
                resolve(result);
            }).catch(error => {
                reject(error);
            })
        })
    }

    getSalt = username => 
        db.users.get({
            fieldToCheck: "user_name",
            fieldToReturn: "salt",
            userValue: username
        }).then(response => {
            return response;
        })

    getValue = (value: string, check_field: string, return_field: string) => 
        db.users.get({
            fieldToCheck: check_field, 
            fieldToReturn: return_field,
            userValue: value
        }).then(response => {
            console.log(response);
            return response;
        })
}
