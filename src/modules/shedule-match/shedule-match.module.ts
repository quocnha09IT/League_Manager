import { Module, forwardRef } from '@nestjs/common';
import { SheduleMatchService } from './shedule-match.service';
import { SheduleMatchController } from './http/controller/shedule-match.controller';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SheduleMatch } from './entities/shedule-match.entity';
import { TeamService } from '../team/team.service';
import { Team } from '../team/entities/team.entity';
import { StandingEntity } from '../standing/entities/standing.entity';
import { StandingService } from '../standing/standing.service';
import { LeagueTeam } from '../league-team/entitis/league-team.entity';
import { LeagueTeamService } from '../league-team/league-team.service';
import { StandingModule } from '../standing/standing.module';
import { LeagueModule } from '../league/league.module';
import { LeagueTeamModule } from '../league-team/league-team.module';

@Module({
  controllers: [SheduleMatchController],
  providers: [SheduleMatchService],
  imports:[ 
    ConfigModule,
    TypeOrmModule.forFeature([SheduleMatch,StandingEntity,LeagueTeam]),
    forwardRef(() =>StandingModule),
    LeagueTeamModule,
],
  exports:[SheduleMatchService]
})
export class SheduleMatchModule {}
