import { Module } from "@nestjs/common";
import { StandingService } from "./standing.service";
import { ConfigModule } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";
import { StandingEntity } from "./entities/standing.entity";
import { StandingController } from "./http/controllers/standing.controller";
import { SheduleMatchService } from "../shedule-matchs/shedule-match.service";
import { SheduleMatch } from "../shedule-matchs/entities/shedule-match.entity";
import { forwardRef } from '@nestjs/common';
import { SheduleMatchModule } from "../shedule-matchs/shedule-match.module";
import { LeagueTeamModule } from "../league-teams/league-team.module";

@Module({
  controllers: [StandingController],
  providers: [StandingService],
  imports:[   
    ConfigModule,
    TypeOrmModule.forFeature([StandingEntity,SheduleMatch]),
    forwardRef(()=> SheduleMatchModule),
],
exports: [StandingService]
}) 
export class StandingModule{}