import { Injectable } from '@nestjs/common';
import { CreateTeamDto } from './dto/create-team.dto';
import { UpdateTeamDto } from './dto/update-team.dto';
import { User } from '../user/entities/user.entity';
import { Team } from './entities/team.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Player } from '../player/entities/player.entity';
import { TeamRepository } from './repository/team.repository';

@Injectable()
export class TeamService {
  constructor(@InjectRepository(Team)
  private teamRepository: TeamRepository
){}
 async create(createTeamDto: CreateTeamDto,createdBy: User): Promise<Team> {
    const team = new Team();
    team.nameTeam = createTeamDto.nameTeam;
    team.logoTeam = createTeamDto.logoTeam;
    team.createdBy =createdBy;
    await this.teamRepository.insert(team);
    return team;
  }

  async findAll() {
    const queryBuilder = this.teamRepository.createQueryBuilder('team')
      .leftJoinAndSelect('team.players', 'players')
      .orderBy('score')
      .getMany()
    return queryBuilder;
  }

  async findByIdWithPlayers(id: number): Promise<Team> {
    const queryBuilder = this.teamRepository.createQueryBuilder('team')
      .leftJoinAndSelect('team.players', 'players')
      .where('team.id = :id', { id })
      .getOne();

    return queryBuilder;
  }


  async findTeamId(teamId : number){
    const team =   await this.teamRepository.findOneBy({
      id : teamId
    })
      return team;
      
  }

}
