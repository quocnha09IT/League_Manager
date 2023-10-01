import { Controller, Get, Post, Body, Patch, Param, Delete ,Put, Query, HttpCode, HttpStatus} from '@nestjs/common';
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
  @HttpCode(HttpStatus.NO_CONTENT)
  async create(@Body() player: CreatePlayerDto) {
    return this.playerService.create(player);
  }

  @Get()
  @ApiBearerAuth('Bearer')
  @Roles( Role.MANAGE_TEAM)
  @ApiOperation({summary:'get all player'})
  @HttpCode(HttpStatus.NO_CONTENT)
  async findAll(): Promise<CreatePlayerDto[]> {
    return this.playerService.findAll();
  }

  @Delete('')
  @ApiBearerAuth('Bearer')
  @Roles(Role.MANAGE_TEAM)
  @ApiOperation({summary:' delete player'})
  @HttpCode(HttpStatus.NO_CONTENT)
  async delete(@Query('id') id: number) {
    return this.playerService.delete(id);
  }

  @Put()
  @ApiBearerAuth('Bearer')
  @Roles(Role.MANAGE_TEAM)
  @ApiOperation({summary: 'update player'})
  @HttpCode(HttpStatus.NO_CONTENT)
  async update(@Query('id') id: number, @Body() updateData: CreatePlayerDto): Promise<Player> {
    return this.playerService.update(id, updateData);
  }

  @Put('update-teamIds')
  @ApiBearerAuth('Bearer')
  @Roles( Role.MANAGE_LEAGUE)
  @ApiOperation({summary: 'update id team of player'})
  @HttpCode(HttpStatus.NO_CONTENT)
  async assignPlayerToTeam(@Query('id') id : number ,@Body('teamId') teamId: UpdateTeamIdsDto):Promise<string> {
    await this.playerService.assignPlayerToTeam(teamId, id);
    return 'Player assigned to team successfully';
  }

  @Get('find-players')
  @ApiOperation({summary: 'search'})
  @HttpCode(HttpStatus.NO_CONTENT)
  async findPlayer(@Param('key')key: string):Promise<Player[]>{
    return this.playerService.findPlayer(key);
  }
}
