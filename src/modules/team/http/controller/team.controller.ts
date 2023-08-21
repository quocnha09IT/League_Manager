import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { TeamService } from '../../team.service';
import { CreateTeamDto } from '../../dto/create-team.dto';
import { UpdateTeamDto } from '../../dto/update-team.dto';
import { Roles, User } from 'src/decorator/roles.decorator';
import { Role } from 'src/common/role.enum';
import { RolesGuard } from 'src/auth/guards.roles';
import { Team } from '../../entities/team.entity';
import { Player } from '../../../player/entities/player.entity';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';

@Controller('teams')
@ApiTags('Team')
export class TeamController {
  constructor(private readonly teamService: TeamService) {}
  @Roles(Role.MANAGE_LEAGUE, Role.MANAGE_TEAM)
  @ApiBearerAuth('Bearer')
  @Post('')
  @ApiOperation({summary: 'create new Team'})
  @ApiBody({
    
    schema: {
      type: 'object',
      properties: {
        nameTeam:{
          type: 'string',
          example: 'liverpool',
          description: 'this is the name of team'
        },

        logoTeam:{
          type: 'string',
          example: 'LIVER',
          description: 'this is the logo team',
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
  create(@Body() createTeamDto: CreateTeamDto, @User() user) {
    return this.teamService.create(createTeamDto,user);
  }



  @Get()
  @ApiBearerAuth('Bearer')
  @Roles(Role.MANAGE_TEAM, Role.MANAGE_LEAGUE)
  @ApiOperation({summary:'get all the team'})
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
    return this.teamService.findAll();
  }



  @Roles(Role.MANAGE_TEAM, Role.MANAGE_LEAGUE)
  @Get(':id')
  @ApiBearerAuth('Bearer')
  @ApiOperation({summary:'get the team folow id'})
  @ApiParam({
    name: 'id',
    type: 'integer',
    description: 'enter unique id',
    required: true
  })
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
  async findById(@Param('id') id: number): Promise<Team> {
    return this.teamService.findByIdWithPlayers(id);
  }

}
