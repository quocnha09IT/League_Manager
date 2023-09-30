import { Controller, Get, Post, Body, Patch, Param, Delete ,Put, Query} from '@nestjs/common';
import { PlayerService } from '../../player.service';
import { CreatePlayerDto } from '../../dto/create-player.dto';
import { UpdatePlayerDto } from '../../dto/update-player.dto';
import { Role } from 'src/common/enum/role.enum';
import { Roles } from 'src/decorator/roles.decorator';
import { Player } from '../../entities/player.entity';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Int32 } from 'typeorm';
import { UpdateTeamIdsDto } from '../../dto/update-teamIds.dto';

@Controller('players')
@ApiTags('Player')
export class PlayerController {
  constructor(private readonly playerService: PlayerService) {}
  @ApiBearerAuth('Bearer')
  @Roles( Role.MANAGE_TEAM,Role.USER)
  @Post()
  @ApiOperation({summary: 'create new player'})
  @ApiResponse({
    status: 201,
    description: 'save....'
  })
  @ApiResponse({
    status: 403,
    description: 'Fobiden....'
  })
  async create(@Body() player: CreatePlayerDto) {
    return this.playerService.create(player);
  }




  @Get()
  @ApiBearerAuth('Bearer')
  @Roles( Role.MANAGE_TEAM)
  @ApiOperation({summary:'get all player'})
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
  async findAll(): Promise<CreatePlayerDto[]> {
    return this.playerService.findAll();
  }



  @Delete('')
  @ApiBearerAuth('Bearer')
  @Roles(Role.MANAGE_TEAM)
  @ApiOperation({summary:' delete player'})
  @ApiResponse({
    status: 201,
    description: 'delete successfully....',
  })
  @ApiResponse({
    status: 403,
    description: 'Fobiden....'
  })
  async delete(@Query('id') id: number) {
    return this.playerService.delete(id);
  }




  @Put()
  @ApiBearerAuth('Bearer')
  @Roles(Role.MANAGE_TEAM)
  @ApiOperation({summary: 'update player'})
  @ApiResponse({
    status: 201,
    description: 'save....'
  })
  @ApiResponse({
    status: 403,
    description: 'Fobiden....'
  })
  async update(@Query('id') id: number, @Body() updateData: CreatePlayerDto): Promise<Player> {
    return this.playerService.update(id, updateData);
  }



  @Put('update-teamIds')
  @ApiBearerAuth('Bearer')
  @Roles( Role.MANAGE_LEAGUE)
  @ApiOperation({summary: 'update id team of player'})
  @ApiResponse({
    status: 201,
    description: 'update successfully....'
  })
  @ApiResponse({
    status: 403,
    description: 'Fobiden....'
  })
  async assignPlayerToTeam(@Query('id') id : number ,@Body('teamId') teamId: UpdateTeamIdsDto):Promise<string> {
    await this.playerService.assignPlayerToTeam(teamId, id);
    return 'Player assigned to team successfully';
  }





  @ApiResponse({
    status: 201,
    description: 'update successfully....'
  })
  @ApiResponse({
    status: 403,
    description: 'Fobiden....'
  })
  @Get('find-players')
  @ApiOperation({summary: 'search'})
  async findPlayer(@Param('key')key: string):Promise<Player[]>{
    return this.playerService.findPlayer(key);
  }
}
