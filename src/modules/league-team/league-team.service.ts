import { Injectable } from "@nestjs/common";
import { LeagueTeamRepository } from "./repository/league-team.repository";
import { LeageTeamDto } from "./dto/league-team.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { LeagueTeam } from "./entitis/league-team.entity";

@Injectable()
export class LeagueTeamService {
    constructor(@InjectRepository(LeagueTeam)
        private leagueTeamRepository: LeagueTeamRepository){}

    AddTeamLeague(leagueteam: LeageTeamDto):Promise<LeagueTeam>{
       return this.leagueTeamRepository.save(leagueteam )
    }



    AddLeagueTeam( idTeam: number,idLeague: number):Promise<LeagueTeam>{
        const leagueteam = new LeageTeamDto()
        leagueteam.teamId = idTeam;
        leagueteam.leagueId = idLeague
        return this.leagueTeamRepository.save(leagueteam);
    }


    
    async findLeagueId(id: number):Promise<number[]>{
       const result =  await this.leagueTeamRepository.find({where : {teamId :id}})
       const leagueIds = result.map(leagueTeam => leagueTeam.leagueId);
       return leagueIds
    }


}