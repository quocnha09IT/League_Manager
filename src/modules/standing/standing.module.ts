import { Module } from "@nestjs/common";
import { StandingService } from "./standing.service";
import { ConfigModule } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";
import { StandingEntity } from "./entities/standing.entity";
import { StandingController } from "./http/controller/standing.controller";
import { SheduleMatchService } from "../shedule-match/shedule-match.service";
import { SheduleMatch } from "../shedule-match/entities/shedule-match.entity";
import { forwardRef } from '@nestjs/common';
import { SheduleMatchModule } from "../shedule-match/shedule-match.module";
import { LeagueTeamModule } from "../league-team/league-team.module";

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