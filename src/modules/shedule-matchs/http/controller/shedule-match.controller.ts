import { Controller, Get, Post, Body, Patch, Param, Delete, Put, Query } from '@nestjs/common';
import { SheduleMatchService } from '../../shedule-match.service';
import { CreateSheduleMatchDto } from '../dto/create-shedule-match.dto';
import { UpdateSheduleMatchDto } from '../dto/update-shedule-match.dto';
import { SheduleMatch } from '../../entities/shedule-match.entity';
import { query } from 'express';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiParam, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Roles } from 'src/decorator/roles.decorator';
import { Role } from 'src/common/enum/role.enum';
import { AddTeamDto } from '../dto/add-team.dto';
import { EnterGoalDto } from '../dto/enter-goal.dto';

@Controller('shedule-matchs')
@ApiTags('Shedule Match')
export class SheduleMatchController {
  constructor(private readonly sheduleMatchService: SheduleMatchService) {}



  // @ApiBearerAuth('Bearer')
  // @Roles( Role.MANAGE_LEAGUE)
  @Post()
  @ApiOperation({summary: 'create new shedule match'})
  @ApiBody({
    
    schema: {
      type: 'object',
      properties: {
        id: {
          type: 'integer',
          example: 5,
          description : 'this is the unique ID',
        },

        date:{
          type: 'date',
          example: '2023-08-16',
          description: 'this is the date'
        },

        time:{
          type: 'time',
          example: '10:30:00',
          description: 'this is the time',
        },

        matchVenue:{
          type: 'string',
          example: 'Stamford Bridge',
          description: 'this is the name match venue',
        },

        homeTeamId:{
          type: 'integer',
          example: 3,
          description: 'this is the Id home team',
        },

        awayTeamId:{
          type: 'integer',
          example: 4,
          description: 'this is the Id away team'
        },
        leagueId:{
          type: 'integer',
          example: 22,
          description: 'this is the leauge Id two team'
        }
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
  createScheduleMatch(@Body() shedule:CreateSheduleMatchDto):Promise<SheduleMatch> {
    return this.sheduleMatchService.createScheduleMatch(shedule);
  }



  @Get('historys')
  @ApiOperation({summary:'get history to home team '})
  async getHistoryMatch(@Query('teamId') teamId:number): Promise<SheduleMatch[]>{
    return this.sheduleMatchService.getHistoryMatch(teamId)
  }



  




  @Get()
  @ApiBearerAuth('Bearer')
  @Roles( Role.MANAGE_LEAGUE)
  @ApiOperation({summary:'get all the shedule match'})
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
  findAll() {
    return this.sheduleMatchService.findAll();
  }
 



  @Put()
  @ApiBearerAuth('')
  @Roles( Role.MANAGE_LEAGUE)
  @ApiOperation({summary: 'update shedule match'})
  @ApiResponse({
    status: 201,
    description: 'update successfully....'
  })
  @ApiResponse({
    status: 403,
    description: 'Fobiden....'
  })
  updateScheduleMatch(@Query('id') id: string, @Body() createSheduleMatchDto: CreateSheduleMatchDto) {
    return this.sheduleMatchService.updateScheduleMatch(+id, createSheduleMatchDto);
  }




  // get comment of user for match

  // @Get('cmt')
  // @ApiOperation({summary:'get all the comment of user for match'})
  // @ApiResponse({
  //   status: 201,
  //   description: 'save....'
  // })
  // @ApiResponse({
  //   status: 403,
  //   description: 'Fobiden....'
  // })
  // @ApiResponse({
  //   status: 500,
  //   description: 'Internal server error....'
  // })
  // async GetComment(@Query('id')id :number){
  //   return await this.sheduleMatchService.GetComment(id);
  // }




  @Put('add-team-play')
  @ApiBearerAuth('Bearer')
  @Roles( Role.MANAGE_LEAGUE)
  @ApiOperation({summary: 'update shedule match'})
  @ApiResponse({
    status: 201,
    description: 'update successfully....'
  })
  @ApiResponse({
    status: 403,
    description: 'Fobiden....'
  })
  addTeamPlay(@Query('id') id: number,@Body() teamPlay: AddTeamDto){
     return this.sheduleMatchService.addTeamPlay(id, teamPlay);
  }




  @Delete('')
  @ApiBearerAuth('Bearer')
  @Roles( Role.MANAGE_LEAGUE)
  @ApiOperation({summary:' delete shedule match'})
  @ApiQuery({
    name: 'id',
    type: 'integer',
    description: 'enter unique id',
    required: true
  })
  @ApiResponse({
    status: 201,
    description: 'delete successfully....'
  })
  @ApiResponse({
    status: 403,
    description: 'Fobiden....'
  })
  remove(@Query('id') id: string) {
    return this.sheduleMatchService.remove(+id);
  }



@Put('enter-goals')
@Roles( Role.MANAGE_LEAGUE,Role.USER)
@ApiBearerAuth('Bearer')
  @ApiOperation({summary: 'Enter goal'})
  @ApiQuery({
    name: 'id',
    type: 'integer',
    description: 'enter unique id',
    required: true
  })
  @ApiResponse({
    status: 201,
    description: 'update successfully....'
  })
  @ApiResponse({
    status: 403,
    description: 'Fobiden....'
  })
async enterGoal(@Query('id') id :number,@Body() goal: EnterGoalDto){
 return this.sheduleMatchService.enterGoal(id,goal)
}
}
