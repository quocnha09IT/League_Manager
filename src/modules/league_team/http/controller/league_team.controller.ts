import { Body, Controller, Post } from "@nestjs/common";
import { LeagueTeamService } from "../../league_team.service";
import { ApiBody, ApiResponse, ApiTags } from "@nestjs/swagger";
import { LeageTeamDto } from "../../dto/league_team.dto";

@Controller('LeageTeam')
@ApiTags('Set up team and league')
export class LeagueTeamController{
    constructor(private leagueTeamService : LeagueTeamService){}

    @Post('AddTeamLeaugue')
    @ApiBody({
        schema: {
          type: 'object',
          properties: {
            leagueId:{
              type: 'integer',
              example: 1,
              description: 'this is the Id league'
            },
    
            teamId:{
              type: 'integer',
              example: 7,
              description: 'this is the team',
            },
    
          }
        }
      })
      @ApiResponse({
        status: 201,
        description: 'save....'
      })
      @ApiResponse({
        status: 403,
        description: 'Fobiden....'
      })
    async AddTeamLeague(@Body()leagueteam : LeageTeamDto){
       await this.leagueTeamService.AddTeamLeague(leagueteam);
    }

}