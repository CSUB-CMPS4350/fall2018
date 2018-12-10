import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from 'domain/users/users.module';
import { AuthModule } from 'domain/auth/auth.module';
import { SecurityController } from './util/security.controller';
import { SecurityModule } from './util/security.module';
//import { EventsModule } from './socket/events.module';
import { AssessmentsModule } from './domain/assessments/assessments.module';
import { GuestsModule } from './domain/guests/guests.module';
import { GameModule } from './domain/game/game.module';

@Module({
  imports: [UsersModule, AuthModule, SecurityModule, AssessmentsModule, GuestsModule, GameModule],
  controllers: [AppController, SecurityController],
  providers: [AppService],
})
export class AppModule {}
