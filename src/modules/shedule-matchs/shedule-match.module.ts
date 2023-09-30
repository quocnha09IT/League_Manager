import { Module, forwardRef } from '@nestjs/common';
import { SheduleMatchService } from './shedule-match.service';
import { SheduleMatchController } from './http/controller/shedule-match.controller';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SheduleMatch } from './entities/shedule-match.entity';
import { StandingEntity } from '../standings/entities/standing.entity';
import { LeagueTeam } from '../league-teams/entitis/league-team.entity';
import { StandingModule } from '../standings/standing.module';
import { LeagueTeamModule } from '../league-teams/league-team.module';

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
