import { Controller, Get, Param, Post, Query } from "@nestjs/common";
import { ApiOperation, ApiParam, ApiQuery, ApiResponse, ApiTags } from "@nestjs/swagger";
import { StandingService } from "../../standing.service";
import { CreateDtoStanding } from "../../dto/create-dto.standing";
import { HomeAwayEnum } from "../../enum/standing.enum";

@Controller('standings')
@ApiTags('Standings of League')
export class StandingController{
    constructor ( private standingService: StandingService){}

    
 


    @ApiOperation({summary:'get standing of league'})
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
    @ApiQuery({name: 'standing', enum:HomeAwayEnum})
    async getStandingHomeAway(@Query('standing') standingQuery: HomeAwayEnum,@Query('id') leagueId : number){
        return await this.standingService.getStandingHomeAway(standingQuery,leagueId);
      }



}