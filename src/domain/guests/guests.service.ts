import { Injectable, Provider } from '@nestjs/common';
import { db } from '../../db/index';
import { AuthService } from '../auth/auth.service';
import { CreateGuestDto } from '../users/dto/create-guest.dto';

@Injectable()
export class GuestsService {
    constructor(
        private readonly authService: AuthService
    ) {}


    guestJoinAssessment(guest: CreateGuestDto) {
        let that = this;
        return new Promise(function (resolve, reject) {
            var values = {
                guest: guest,
                uuid: '',
                jwt: ''
            }
            db.live_assessments.findOnePin({
                fieldToCheck: 'pin',
                userValue: guest.assessment_pin
            }).then(result => {
                values.uuid = result.uuid;
                return that.authService.signGuestJwt(guest, values.uuid);
            }).then(result => {
                console.log(result);
                values.jwt = result;
                return db.guest_users.add({
                    "tag": guest.tag,
                    "assessment_uuid": values.uuid,
                    "jwt_value": values.jwt
                });
            }).then(result => {
                console.log(result)
                resolve(result);
            }).catch(error => {
                reject(error);
            })
        });
    }


}