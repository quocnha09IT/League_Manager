import { Module } from '@nestjs/common';
import { SheduleMatchService } from './shedule-match.service';
import { SheduleMatchController } from './http/controller/shedule-match.controller';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SheduleMatch } from './entities/shedule-match.entity';

@Module({
  controllers: [SheduleMatchController],
  providers: [SheduleMatchService],
  imports:[ConfigModule,
    TypeOrmModule.forFeature([SheduleMatch]),
],
})
export class SheduleMatchModule {}
