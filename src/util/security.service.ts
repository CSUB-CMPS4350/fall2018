import { Injectable } from '@nestjs/common';
const argon2 = require('argon2');
const crypto = require('crypto');
const promise = require('bluebird');

@Injectable()
export class SecurityService {
    hashPassword = (password: string, salt: string, config?: object) =>
        argon2.hash(password + salt)
        .then(result => {
            console.log("Password: "+password + "\nSalt: "+salt)
            return result;
        }).catch(error => {
            return error;
        });

    verifyPassword(passwordHash, password) {
        return new Promise(function (resolve, reject) {
            argon2.verify(passwordHash, password)
                .then(match => {
                    console.log(match)
                    console.log("PasswordHash: "+passwordHash + "\nPassword: "+password)
                    if (match) {
                        return true;
                    } else {
                        return false;
                    }
                }).then(result => {
                    resolve(result);
                }).catch(error => {
                    console.log(error);
                    reject('Could not find a user with that username or password');
                    return false;
                });
        });
    }
    getSalt(size) {
        return new Promise(function(resolve, reject) {
            try {
                resolve(crypto.randomBytes(size).toString('base64'));
            }
            catch (error) {
                reject(error);
            }
        });
    };
}
