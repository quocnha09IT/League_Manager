import { Controller, Get, Param, Post } from "@nestjs/common";
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from "@nestjs/swagger";
import { StandingService } from "../../standing.service";

@Controller('standing')
@ApiTags('Standings of League')
export class StandingController{
    constructor ( private standingService: StandingService){}

    
 
  @ApiOperation({summary:'get standing of league'})
  @ApiParam({
    name: 'id',
    type: 'integer',
    description: 'enter unique league Id',
    required: true
  })
  @ApiResponse({
    status: 201,
    description: 'save....'
  })
  @ApiResponse({
    status: 403,
    description: 'Fobiden....'
  })
  @ApiResponse({
    status: 500,
    description: 'Internal server error....'
  })
  @Get(':id')
  async standing(@Param('id') LeagueId : number){
    return await this.standingService.standing(LeagueId);
    }
}