import { Controller, Get, Post, Body, Patch, Param, Delete, Put, Query, HttpStatus, HttpCode } from '@nestjs/common';
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

  @Post()
  @ApiOperation({summary: 'create new shedule match'})
  @HttpCode(HttpStatus.CREATED)
  createScheduleMatch(@Body() shedule:CreateSheduleMatchDto):Promise<SheduleMatch> {
    return this.sheduleMatchService.createScheduleMatch(shedule);
  }

  @Get('historys')
  @ApiOperation({summary:'get history to home team '})
  @HttpCode(HttpStatus.NO_CONTENT)
  async getHistoryMatch(@Query('teamId') teamId:number): Promise<SheduleMatch[]>{
    return this.sheduleMatchService.getHistoryMatch(teamId)
  }

  @Get()
  @ApiBearerAuth('Bearer')
  @Roles( Role.MANAGE_LEAGUE)
  @ApiOperation({summary:'get all the shedule match'})
  @HttpCode(HttpStatus.NO_CONTENT)
  findAll() {
    return this.sheduleMatchService.findAll();
  }
 
  @Put()
  @ApiBearerAuth('')
  @Roles( Role.MANAGE_LEAGUE)
  @ApiOperation({summary: 'update shedule match'})
  @HttpCode(HttpStatus.NO_CONTENT)
  updateScheduleMatch(@Query('id') id: string, @Body() createSheduleMatchDto: CreateSheduleMatchDto) {
    return this.sheduleMatchService.updateScheduleMatch(+id, createSheduleMatchDto);
  }

  @Put('add-team-play')
  @ApiBearerAuth('Bearer')
  @Roles( Role.MANAGE_LEAGUE)
  @ApiOperation({summary: 'update shedule match'})
  @HttpCode(HttpStatus.NO_CONTENT)
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
  @HttpCode(HttpStatus.NO_CONTENT)
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
  @HttpCode(HttpStatus.NO_CONTENT)
async enterGoal(@Query('id') id :number,@Body() goal: EnterGoalDto): Promise<{message: string}>{
 return this.sheduleMatchService.enterGoal(id,goal)
}
}
