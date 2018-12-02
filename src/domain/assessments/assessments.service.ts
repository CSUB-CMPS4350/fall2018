import { Injectable, Inject } from '@nestjs/common';
import { NewAssessmentDto } from './dto/new.dto';
import { db } from '../../db/index';

@Injectable()
export class AssessmentsService {

    create(assessment: NewAssessmentDto) {
        return new Promise(function (resolve, reject) {
            db.assessments.new(assessment)
            .then(result => {
                resolve(result);
            }).catch(error => {
                reject(error);
            });
        });
    }

}