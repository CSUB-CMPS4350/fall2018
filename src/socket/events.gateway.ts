import {
    SubscribeMessage,
    WebSocketGateway,
    WebSocketServer,
    WsResponse,
} from '@nestjs/websockets';
import { from, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AssessmentsService } from '../domain/assessments/assessments.service';
import { AnyJson, JsonArray } from 'dtos/json.dto';
import { GuestsService } from 'domain/guests/guests.service';
import { CreateGuestDto } from 'domain/users/dto/create-guest.dto';
let crypto = require('crypto');
let format = require('biguint-format');

@WebSocketGateway(8080)
export class EventsGateway {
    constructor(
        private readonly assessmentsService: AssessmentsService,
        private readonly guestsService: GuestsService
    ) {}
    
    @WebSocketServer() server;

    @SubscribeMessage('events')
    onEvent(client, data): Observable<WsResponse<number>> {
        return from([1, 2, 3]).pipe(map(item => ({ event: 'events', data: item })));
    }

    @SubscribeMessage('random_numbers')
    randomNumbers(client, data): string {
        let rdm_numbers = crypto.randomBytes(1);
        return format(rdm_numbers, 'dec');
    }

    @SubscribeMessage('create_assessment')
    async createAssessment(client, data): Promise<JsonArray> {
        console.log(data)
        let uuid = this.assessmentsService.create(data)
        .then(response => {
            console.log(response);
            return response;
        }).catch(error => {
            console.log(error);
            return error;
        });
        return uuid;
    }

    @SubscribeMessage('join_quiz')
    async joinQuiz(client, data): Promise<JsonArray> {
        console.log(data);
        const guest: CreateGuestDto = { assessment_pin: data.pin, tag: data.tag };
        console.log(guest);
        let results = this.guestsService.guestJoinAssessment(guest)
        .then(result => {
            return result;
        }).catch(error => {
            console.log(error);
            return error;
        });
        return results;
    }

}