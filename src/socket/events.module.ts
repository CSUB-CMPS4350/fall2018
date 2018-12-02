import { Module } from '@nestjs/common';
import { EventsGateway } from './events.gateway';
import { GuestsModule } from '../domain/guests/guests.module';
import { AssessmentsService } from '../domain/assessments/assessments.service';
import { AssessmentsModule } from 'domain/assessments/assessments.module';

@Module({
  providers: [EventsGateway],
  imports: [AssessmentsModule, GuestsModule]
})
export class EventsModule {}