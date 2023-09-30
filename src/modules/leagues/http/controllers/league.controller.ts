import { Controller, Get, Post, Body, Patch, Param, Delete, Put ,Req, Query} from '@nestjs/common';
import { LeagueService } from '../../league.service';
import { CreateLeagueDto } from '../../dto/create-league.dto';
import { League } from '../../entities/league.entity';
import { Role } from 'src/common/enum/role.enum';
import { Roles } from 'src/decorator/roles.decorator';
import { ApiOperation, ApiParam, ApiResponse, ApiTags,ApiBody, ApiBearerAuth, ApiQuery } from '@nestjs/swagger';
import { promises } from 'dns';


@Controller('leagues')
@ApiTags('League')
export class LeagueController {
  constructor(private leagueService: LeagueService){}

  @Roles(Role.MANAGE_LEAGUE,Role.USER)
  @Post()
  @ApiBearerAuth('Bearer')
  @ApiOperation({summary: 'create a league'})
  @ApiResponse({
    status: 201,
    description: 'save....'
  })
  @ApiResponse({
    status: 403,
    description: 'Fobiden....'
  })
  async create(@Body() createLeagueDte: CreateLeagueDto) {
    return this.leagueService.create(createLeagueDte);
  }



  @Get('search')
  @ApiOperation({summary:'search'})
   async findLeague(@Query('key') key : string){
    return await this.leagueService.findLeague(key);
   }

  


  @Roles(Role.MANAGE_LEAGUE,Role.USER)
  @Put()
  @ApiBearerAuth('Bearer')
  @ApiOperation({summary: 'update league'})
  @ApiResponse({
    status: 201,
    description: 'save....'
  })
  @ApiResponse({
    status: 403,
    description: 'Fobiden....'
  })
  async update(@Query('id') id: number, @Body() updateData: Partial<CreateLeagueDto>):Promise<League> {
    return this.leagueService.updateLeague(id, updateData);
  }




  @ApiOperation({summary:'get match of league'})
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
  @Get('match-of-leagues')
  async getMatchOfLeague():Promise<League[]>{
      return await this.leagueService.getMatchOfLeague();
    }
  






  @Roles(Role.MANAGE_LEAGUE,Role.USER)
  @Delete()
  @ApiBearerAuth('Bearer')
  @ApiOperation({summary:' delete league'})
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
  async delete(@Query('id') id: number) {
    return await this.leagueService.deleteLeague(id);
  }
  




  @Get('team-of-league')
  @ApiOperation({summary:'get team of league'})
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
  async getTeamOfLeague(@Query('id') id : number):Promise<League[]>{
    return await this.leagueService.getTeamOfLeague(id)
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
  async getPage(@Query('page') page :number,@Query('limit') limit :number,total : string): Promise<{
    currentPage: number;
    totalPage: number;
    lastPage: number;
    itemsPerPage: number;
    perPage: number;
    data: League[];
}>{

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


  





 
}


