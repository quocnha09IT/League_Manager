import { Module } from '@nestjs/common';
import { TeamService } from './team.service';
import { TeamController } from './http/controller/team.controller';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Team } from './entities/team.entity';
import { LeagueTeam } from '../league_team/entitis/league_team.entity';
import { LeagueTeamService } from '../league_team/league_team.service';

@Module({
  controllers: [TeamController],
  providers: [TeamService],
  imports:[ConfigModule,
    TypeOrmModule.forFeature([Team]),
],
})
export class TeamModule {}
