import { Controller, Post, Body, Get, Render } from '@nestjs/common';
import { NewAssessmentDto } from './dto/new.dto';
const path = require('path');
import { db } from '../../db/index';
import { AssessmentsService } from './assessments.service';
import { JsonArray } from 'dtos/json.dto';
import { GuestsController } from 'domain/guests/guests.controller';
import { NewCategoryDto } from './dto/new-category.dto';

let crypto = require('crypto');
let format = require('biguint-format');

@Controller('game')
export class AssessmentsController {
    constructor(
        private readonly assessmentsService: AssessmentsService
    ) {}

    @Get(':uuid')
    @Render('game')
    game (@Param() params) {
        return { uuid: params.uuid}
    }
}
