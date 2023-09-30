import { Module, forwardRef } from "@nestjs/common";
import { LeagueTeamController } from "./http/controller/league-team.controller";
import { LeagueTeamService } from "./league-team.service";
import { ConfigModule } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";
import { LeagueTeam } from "./entitis/league-team.entity";
import { SheduleMatchModule } from "../shedule-matchs/shedule-match.module";


@Module(
    {
        controllers: [LeagueTeamController],
        providers: [LeagueTeamService],
        imports: [ConfigModule,  
        TypeOrmModule.forFeature([LeagueTeam])
        ],
        exports: [LeagueTeamService]

    }
) export class LeagueTeamModule{}