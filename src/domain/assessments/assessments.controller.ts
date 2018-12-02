import { Controller, Post, Body, Get } from '@nestjs/common';
import { NewAssessmentDto } from './dto/new.dto';
const path = require('path');
import { db } from '../../db/index';
import { AssessmentsService } from './assessments.service';
import { JsonArray } from 'dtos/json.dto';

let crypto = require('crypto');
let format = require('biguint-format');

@Controller('assessments')
export class AssessmentsController {
    constructor(
        private readonly assessmentsService: AssessmentsService
    ) {}

    @Post('all')
    getAll() {
        return new Promise(function (resolve, reject) {
            
            db.assessments.get()
            .then(results => {
                const data = {
                    data: results
                }
                resolve(data);
            }).catch(error => {
                reject(error);
            });
        });
    }

    @Post('new')
    create(@Body() assessment: NewAssessmentDto) {
        return new Promise(function (resolve, reject) {
            this.assessmentsService.create(assessment)
            .then(result => {
                resolve(result)
            }).catch(error => {
                reject(error)
            });
        });
    }

    @Post('start_assessment')
    startAssessment(@Body() data: JsonArray): Promise<JsonArray> {
        return new Promise(function (resolve, reject) {
            console.log(data);
            let uuid = data["assessment_uuid"];

            const assessment = {
                fieldToCheck: "uuid_",
                userValue: uuid
            };

            for (var v in data) {
                console.log(v);
            }

            console.log("uuid received from post request: "+uuid);
            
            db.assessments.findOne(assessment)
            .then(result => {
                let pin_bytes = crypto.randomBytes(2);
                let pin = format(pin_bytes, 'dec');
                
                const live_assessment = {
                    assessment_uuid: uuid,
                    pin: pin
                };

                return db.live_assessments.add(live_assessment);
            }).then(result => {
                resolve(result);
            }).catch(error => {
                reject(error);
            });
        });
    }
}