import { Module } from "@nestjs/common";
import { LeagueTeamController } from "./http/controller/league_team.controller";
import { LeagueTeamService } from "./league_team.service";
import { ConfigModule } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";
import { LeagueTeam } from "./entitis/league_team.entity";


@Module(
    {
        controllers: [LeagueTeamController],
        providers: [LeagueTeamService],
        imports: [ConfigModule,
        TypeOrmModule.forFeature([LeagueTeam])
        ]

    }
) export class LeagueTeamModule{}