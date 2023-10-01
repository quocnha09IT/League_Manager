import { Controller, Get, HttpCode, HttpStatus, Param, Post, Query } from "@nestjs/common";
import { ApiOperation, ApiParam, ApiQuery, ApiResponse, ApiTags } from "@nestjs/swagger";
import { StandingService } from "../../standing.service";
import { HomeAwayEnum } from "../../enum/standing.enum";

@Controller('standings')
@ApiTags('Standings of League')
export class StandingController{
    constructor ( private standingService: StandingService){}


    @Get(':id')
    @HttpCode(HttpStatus.NO_CONTENT)
    @ApiOperation({
      description: 'Standing of team'
    })
    @ApiQuery({name: 'standing', enum:HomeAwayEnum})
    async getStandingHomeAway(@Query('standing') standingQuery: HomeAwayEnum,@Query('id') leagueId : number){
        return await this.standingService.getStandingHomeAway(standingQuery,leagueId);
      }
}