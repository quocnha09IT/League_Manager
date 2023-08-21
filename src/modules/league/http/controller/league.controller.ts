import { Controller, Get, Post, Body, Patch, Param, Delete, Put ,Req, Query} from '@nestjs/common';
import { LeagueService } from '../../league.service';
import { CreateLeagueDto } from '../../dto/create-league.dto';
import { UpdateLeagueDto } from '../../dto/update-league.dto';
import { UserService } from '../../../user/user.service';
import { League } from '../../entities/league.entity';
import { Role } from 'src/common/role.enum';
import { Roles, User } from 'src/decorator/roles.decorator';
import { from } from 'rxjs';
import {Request, response} from 'express';
import { ApiOperation, ApiParam, ApiResponse, ApiTags,ApiBody, ApiBearerAuth } from '@nestjs/swagger';


@Controller('leagues')
@ApiTags('League')
export class LeagueController {
  constructor(private leagueService: LeagueService){}

  @Roles(Role.MANAGE_LEAGUE,Role.USER)
  @Post('')
  @ApiBearerAuth('Bearer')
  @ApiOperation({summary: 'create a league'})
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        nameLeague:{
          type: 'string',
          example: 'English Premier League',
          description: 'this is the name league'
        },

        sport:{
          type: 'string',
          example: 'Football',
          description: 'this is the name sport of league',
        },

        area:{
          type: 'string',
          example: 'English',
          description: 'this is the are of league',
        },

        level:{
          type: 'string',
          example: 'clubs',
          description: 'this is the level of league',
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
  async create(@Body() createLeagueDte: CreateLeagueDto, @User() user) {
    return this.leagueService.create(createLeagueDte,user);
  }





  @Roles(Role.MANAGE_LEAGUE,Role.USER)
  @Put(':id')
  @ApiBearerAuth('Bearer')
  @ApiOperation({summary: 'update league'})
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
        nameLeague:{
          type: 'string',
          example: 'English Premier League',
          description: 'this is the name league'
        },

        sport:{
          type: 'string',
          example: 'Football',
          description: 'this is the name sport of league',
        },

        are:{
          type: 'string',
          example: 'English',
          description: 'this is the are of league',
        },

        level:{
          type: 'string',
          example: 'clubs',
          description: 'this is the level of league',
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
  async update(@Param('id') id: number, @Body() updateData: Partial<CreateLeagueDto>): Promise<CreateLeagueDto> {
    return this.leagueService.update(id, updateData);
  }






  @Roles(Role.MANAGE_LEAGUE,Role.USER)
  @Delete(':id')
  @ApiBearerAuth('Bearer')
  @ApiOperation({summary:' delete league'})
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
  async delete(@Param('id') id: number) {
    return this.leagueService.delete(id);
  }
  






  @Get('')
  @Roles(Role.MANAGE_LEAGUE,Role.USER)
  @ApiBearerAuth('Bearer')
  @ApiOperation({summary:'get all league have page'})
  @ApiResponse({
    status: 201,
    description: 'successfully....'
  })
  @ApiResponse({
    status: 403,
    description: 'Fobiden....'
  })
  @ApiResponse({
    status: 500,
    description: 'Internal server error....'
  })
  async getpage(@Query('page') page :number,@Query('limit') limit :number,total : string){

    const itemsPerPage = limit > 0 ? limit : 10;
    const leagues = await this.leagueService.getPage(page, itemsPerPage);
    const totalRecords = await this.leagueService.getTotalRecords();
    const lastPage = Math.ceil(totalRecords / limit);
    return {
      currentPage: page,
      totalPage: totalRecords,
      lastPage:lastPage,
      itemsPerPage,
      perPage:limit,
      data: leagues,
    };
  }




  @Get('standings/:id')
  async standingsLeague(@Param('id') id : number){
   return this.leagueService.standingsLeague(id);

  }


 
}


