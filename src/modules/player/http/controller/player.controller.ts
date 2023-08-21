import { Controller, Get, Post, Body, Patch, Param, Delete ,Put, Query} from '@nestjs/common';
import { PlayerService } from '../../player.service';
import { CreatePlayerDto } from '../../dto/create-player.dto';
import { UpdatePlayerDto } from '../../dto/update-player.dto';
import { Role } from 'src/common/role.enum';
import { Roles, player } from 'src/decorator/roles.decorator';
import { Player } from '../../entities/player.entity';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Int32 } from 'typeorm';

@Controller('players')
@ApiTags('Player')
export class PlayerController {
  constructor(private readonly playerService: PlayerService) {}
  @ApiBearerAuth('Bearer')
  @Roles( Role.MANAGE_TEAM,Role.USER)
  @Post()
  @ApiOperation({summary: 'create new player'})
  @ApiBody({
    
    schema: {
      type: 'object',
      properties: {
        playerName:{
          type: 'string',
          example: 'Rodrygo Silva de Goes',
          description: 'this is the name player'
        },

        age:{
          type: 'integer',
          example: 33,
          description: 'this is the age of player',
        },

        clothesNumber:{
          type: 'integer',
          example: 22,
          description: 'this is the clothes number of player',
        },

        nationnality:{
          type: 'string',
          example: 'Prance',
          description: 'this is the nationnality of player',
        },

        playForTeam:{
          type: 'string',
          example: 'REAL',
          description: 'this is the team of player'
        },
        position:{
          type: 'string',
          example: 'ST',
          description: 'this is the position of player'
        },
        height:{
          type: 'integer',
          example: 189,
          description: 'this is the height of player'
        },
        weight:{
          type: 'integer',
          example: 75,
          description: 'this is the weight of player'
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



  @Delete(':id')
  @ApiBearerAuth('Bearer')
  @Roles(Role.MANAGE_TEAM)
  @ApiOperation({summary:' delete player'})
  @ApiParam({
    name: 'id',
    type: 'integer',
    description: 'enter unique id',
    required: true
  })
  @ApiResponse({
    status: 201,
    description: 'delete successfully....',
  })
  @ApiResponse({
    status: 403,
    description: 'Fobiden....'
  })
  async delete(@Param('id') id: number) {
    return this.playerService.delete(id);
  }


  
  @Put('update/:id')
  @ApiBearerAuth('Bearer')
  @Roles(Role.MANAGE_TEAM)
  @ApiOperation({summary: 'update player'})
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
        playerName:{
          type: 'string',
          example: 'Rodrygo Silva de Goes',
          description: 'this is the name player'
        },

        age:{
          type: 'integer',
          example: 33,
          description: 'this is the age of player',
        },

        clothesNumber:{
          type: 'integer',
          example: 22,
          description: 'this is the clothes number of player',
        },

        nationnality:{
          type: 'string',
          example: 'Prance',
          description: 'this is the nationnality of player',
        },

        playForTeam:{
          type: 'string',
          example: 'REAL',
          description: 'this is the team of player'
        },
        position:{
          type: 'string',
          example: 'ST',
          description: 'this is the position of player'
        },
        height:{
          type: 'integer',
          example: 189,
          description: 'this is the height of player'
        },
        weight:{
          type: 'integer',
          example: 75,
          description: 'this is the weight of player'
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
  async update(@Param('id') id: number, @Body() updateData: Partial<CreatePlayerDto>): Promise<CreatePlayerDto> {
    return this.playerService.update(id, updateData);
  }



  @Put('team/:id')
  @ApiBearerAuth('Bearer')
  @Roles( Role.MANAGE_LEAGUE)
  @ApiOperation({summary: 'update id team of player'})
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
        teamId :{
          type: 'integer',
          example: 3,
          description: 'this is the Id team of player',
        },
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
  async assignPlayerToTeam(@Param('id') id : number ,@Body('teamId') teamId: number) {
    await this.playerService.assignPlayerToTeam(teamId, id);
    return 'Player assigned to team successfully';
  }
}
