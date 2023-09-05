import { Module } from '@nestjs/common';
import { SheduleMatchService } from './shedule-match.service';
import { SheduleMatchController } from './http/controller/shedule-match.controller';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SheduleMatch } from './entities/shedule-match.entity';
import { TeamService } from '../team/team.service';
import { Team } from '../team/entities/team.entity';
import { StandingEntity } from '../standing/entities/standing.entity';
import { StandingService } from '../standing/standing.service';
import { LeagueTeam } from '../league_team/entitis/league_team.entity';
import { LeagueTeamService } from '../league_team/league_team.service';

@Module({
  controllers: [SheduleMatchController],
  providers: [SheduleMatchService,LeagueTeamService,StandingService],
  imports:[ConfigModule,
    TypeOrmModule.forFeature([SheduleMatch,LeagueTeam,StandingEntity]),
],
})
export class SheduleMatchModule {}
