import { Module } from '@nestjs/common';
import { SheduleMatchService } from './shedule-match.service';
import { SheduleMatchController } from './http/controller/shedule-match.controller';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SheduleMatch } from './entities/shedule-match.entity';
import { TeamService } from '../team/team.service';
import { Team } from '../team/entities/team.entity';

@Module({
  controllers: [SheduleMatchController],
  providers: [SheduleMatchService,TeamService],
  imports:[ConfigModule,
    TypeOrmModule.forFeature([SheduleMatch,Team]),
],
})
export class SheduleMatchModule {}
