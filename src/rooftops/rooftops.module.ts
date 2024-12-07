import { Module } from '@nestjs/common';
import { RooftopsService } from './rooftops.service';
import { RooftopsController } from './rooftops.controller';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [AuthModule],
  controllers: [RooftopsController],
  providers: [RooftopsService],
})
export class RooftopsModule {} 