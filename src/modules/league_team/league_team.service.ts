import { Injectable } from "@nestjs/common";
import { LeagueTeamRepository } from "./repository/league_team.repository";
import { LeageTeamDto } from "./dto/league_team.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { LeagueTeam } from "./entitis/league_team.entity";

@Injectable()
export class LeagueTeamService {
    constructor(@InjectRepository(LeagueTeam)
        private leagueTeamRepository: LeagueTeamRepository){}

    AddTeamLeague(leagueteam: LeageTeamDto){
        this.leagueTeamRepository.save(leagueteam )
    }

    AddLeagueTeam( idTeam: number,idLeague: number){
        const leagueteam = new LeageTeamDto()
        leagueteam.teamId = idTeam;
        leagueteam.leagueId = idLeague
        return this.leagueTeamRepository.save(leagueteam);
    }

    async findLeagueId(id: number){
       const result =  await this.leagueTeamRepository.find({where : {teamId :id}})
       const leagueIds = result.map(leagueTeam => leagueTeam.leagueId);
       return leagueIds
    }


}