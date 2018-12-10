import { Controller, Post, Body, Get, Render, Param } from '@nestjs/common';
const path = require('path');
import { db } from '../../db/index';
import { JsonArray } from 'dtos/json.dto';
import { GuestsController } from 'domain/guests/guests.controller';

let crypto = require('crypto');
let format = require('biguint-format');

@Controller('game/:pin')
export class GameController {
    constructor(
    ) {}

    @Get()
    @Render('ed_quiz')
    game (@Param() params) {
        return { pin: params.pin}
    }
}
