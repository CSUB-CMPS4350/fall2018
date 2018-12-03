import { Module } from '@nestjs/common';
import { GuestsController } from './guests.controller';
import { AuthModule } from '../auth/auth.module';
import { GuestsService } from './guests.service';

@Module({
    imports: [AuthModule],
    controllers: [GuestsController],
    providers: [GuestsService],
    exports: [GuestsService]
})
export class GuestsModule {}