import { Controller, Get, Post, Body, Patch, Param, Delete, Put, Query } from '@nestjs/common';
import { SheduleMatchService } from './shedule-match.service';
import { CreateSheduleMatchDto } from './dto/create-shedule-match.dto';
import { UpdateSheduleMatchDto } from './dto/update-shedule-match.dto';
import { SheduleMatch } from './entities/shedule-match.entity';
import { query } from 'express';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Roles } from 'src/decorator/roles.decorator';
import { Role } from 'src/common/role.enum';

@Controller('shedule-matchs')
@ApiTags('Shedule Match')
export class SheduleMatchController {
  constructor(private readonly sheduleMatchService: SheduleMatchService) {}



  @ApiBearerAuth('Bearer')
  @Roles( Role.MANAGE_LEAGUE)
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
  create(@Body() shedule:SheduleMatch) {
    return this.sheduleMatchService.create(shedule);
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
 


  @Get(':id')
  @ApiBearerAuth('Bearer')
  @Roles( Role.MANAGE_LEAGUE)
  findOne(@Param('id') id: string) {
    return this.sheduleMatchService.findOne(+id);
  }




  @Put(':id')
  @ApiBearerAuth('')
  @Roles( Role.MANAGE_LEAGUE)
  @ApiOperation({summary: 'update shedule match'})
  @ApiParam({
    name: 'id',
    type: 'integer',
    description: 'enter unique id',
    required: true
  })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {

        date:{
          type: 'string',
          format: 'date',
          example: '2023-08-17',
          description: 'this is the date'
        },

        time:{
          type: 'string',
          format: 'time',
          example: '11:30:00',
          description: 'this is the time',
        },

        matchVenue:{
          type: 'string',
          example: 'ETIHAD',
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
        }
      }
    }
    
  })
  @ApiResponse({
    status: 201,
    description: 'update successfully....'
  })
  @ApiResponse({
    status: 403,
    description: 'Fobiden....'
  })
  update(@Param('id') id: string, @Body() updateSheduleMatchDto: UpdateSheduleMatchDto) {
    return this.sheduleMatchService.update(+id, updateSheduleMatchDto);
  }




  @Put('addTeamPlay/:id')
  @ApiBearerAuth('Bearer')
  @Roles( Role.MANAGE_LEAGUE)
  @ApiOperation({summary: 'update shedule match'})
  @ApiParam({
    name: 'id',
    type: 'integer',
    description: 'enter unique id',
    required: true
  })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        homeTeamId:{
          type: 'integer',
          example: 3,
          description: 'this is the Id home team',
        },

        awayTeamId:{
          type: 'integer',
          example: 2,
          description: 'this is the Id away team'
        }
      }
    }
    
  })
  @ApiResponse({
    status: 201,
    description: 'update successfully....'
  })
  @ApiResponse({
    status: 403,
    description: 'Fobiden....'
  })
  addTeamPlay(@Param('id') id: number,@Body() teamPlay: Partial<SheduleMatch>){
     return this.sheduleMatchService.addTeamPlay(id, teamPlay);
  }




  @Delete(':id')
  @ApiBearerAuth('Bearer')
  @Roles( Role.MANAGE_LEAGUE)
  @ApiOperation({summary:' delete shedule match'})
  @ApiParam({
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
  remove(@Param('id') id: string) {
    return this.sheduleMatchService.remove(+id);
  }



@Put('enterGoals/:id')
@Roles( Role.MANAGE_LEAGUE,Role.USER)
@ApiBearerAuth('Bearer')
  @ApiOperation({summary: 'Enter goal'})
  @ApiParam({
    name: 'id',
    type: 'integer',
    description: 'enter unique id',
    required: true
  })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        goalHome:{
          type: 'integer',
          example: 3,
          description: 'this is the goal of team home ',
        },

        goalAway:{
          type: 'integer',
          example: 2,
          description: 'this is the goal of away team'
        }
      }
    }
    
  })
  @ApiResponse({
    status: 201,
    description: 'update successfully....'
  })
  @ApiResponse({
    status: 403,
    description: 'Fobiden....'
  })
async enterGoal(@Param('id') id :number,@Body() goal: Partial<SheduleMatch>){
 return this.sheduleMatchService.enterGoal(id,goal)
}
}
