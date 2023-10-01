import { Body, Controller, HttpCode, HttpStatus, Post } from "@nestjs/common";
import { LeagueTeamService } from "../../league-team.service";
import { ApiBody, ApiResponse, ApiTags } from "@nestjs/swagger";
import { LeageTeamDto } from "../../dto/league-team.dto";

@Controller('league-team')
@ApiTags('Set up team and league')
export class LeagueTeamController{
    constructor(private leagueTeamService : LeagueTeamService){}

    @Post('add-team-leagues')
    @HttpCode(HttpStatus.NO_CONTENT)
    async AddTeamLeague(@Body()leagueteam : LeageTeamDto){
       await this.leagueTeamService.AddTeamLeague(leagueteam);
    }

}