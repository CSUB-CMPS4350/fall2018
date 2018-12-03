import { Controller, Post, Body } from '@nestjs/common';
import { CreateGuestDto } from '../users/dto/create-guest.dto';
import { AuthService } from '../auth/auth.service';
import { db } from '../../db/index';
import { GuestsService } from './guests.service';

@Controller('guests')
export class GuestsController {
    constructor(
        private readonly authService: AuthService,
        private readonly guestsService: GuestsService
    ) {}

    @Post('join')
    guestJoinAssessment(@Body() guest: CreateGuestDto) {
        return this.guestsService.guestJoinAssessment(guest);
    }
}