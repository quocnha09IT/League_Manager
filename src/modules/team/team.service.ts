import { Injectable } from '@nestjs/common';
import { CreateTeamDto } from './dto/create-team.dto';
import { UpdateTeamDto } from './dto/update-team.dto';
import { User } from '../user/entities/user.entity';
import { Team } from './entities/team.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, UpdateResult } from 'typeorm';
import { Player } from '../player/entities/player.entity';
import { TeamRepository } from './repository/team.repository';
import { LeagueTeamService } from '../league_team/league_team.service';
import { League } from '../league/entities/league.entity';


@Injectable()
export class TeamService {
  constructor(@InjectRepository(Team)
  private teamRepository: TeamRepository,
){}
 async create(createTeamDto: CreateTeamDto) {
      const league = new League()
       league.id = createTeamDto.leagueId;
      const team = new Team();
      team.leagues = [league];
      team.nameTeam = createTeamDto.nameTeam;
       team.logoTeam = createTeamDto.logoTeam;
       this.teamRepository.save(team);
  }


  async GetTeam(){
    return await this.teamRepository.find()
  }

  async findAll() {
    const queryBuilder = this.teamRepository.createQueryBuilder('team')
      .leftJoinAndSelect('team.players', 'players')
      // .orderBy('score')
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


  async findTeam(id : number){
    return await this.teamRepository.findBy({id})
  }


  async findLeague(id: number){
    return this.teamRepository.findOne({where:{id}});
  }


  async getLeagueOfTeam(id : number){
    return this.teamRepository.find({
      relations:{ leagues: true},
      where :{
        id :id 
      }
    })
  }

  async updateLogo(logoTeam:string, id : number): Promise<UpdateResult>{
    return await this.teamRepository.update(id,{logoTeam});

  }


}
