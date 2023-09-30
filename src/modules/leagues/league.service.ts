import { Body, HttpStatus, Injectable } from '@nestjs/common';
import { CreateLeagueDto } from './dto/create-league.dto';
import { League } from './entities/league.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Like, Repository } from 'typeorm';
import { LeagueRpository } from './repositories/league.repository';
import { Team } from '../teams/entities/team.entity';

@Injectable()
export class LeagueService {
  constructor(@InjectRepository(League)
              private leagueRepository:LeagueRpository
  ){}




async create(leagueDto : CreateLeagueDto ):Promise<League>{
    const league = new League();
    league.teams = [];
  if (Array.isArray(leagueDto.teamId)) {
  leagueDto.teamId.forEach((id) => {
    const team = new Team();
    team.id = id;
    league.teams.push(team); 
    });
     league.nameleague = leagueDto.nameleague;
     league.area = leagueDto.area;
     league.level = leagueDto.level;
     league.sport = leagueDto.sport;   
    return await this.leagueRepository.save(league);
  }else{
    league.nameleague = leagueDto.nameleague;
    league.area = leagueDto.area;
    league.level = leagueDto.level;
    league.sport = leagueDto.sport;
    
    return await this.leagueRepository.save(league);
  }
  }


async getLeague():Promise<League[]>{
    return await this.leagueRepository.find()
  }

async updateLeague(id: number, updateData: Partial<League>): Promise<League> {
    const existingManage = await this.leagueRepository.findOneBy({id});
    if (!existingManage) {
    }
    Object.assign(existingManage, updateData);
    return this.leagueRepository.save(existingManage);
  }




  async deleteLeague(id:number): Promise<DeleteResult>{
    const existingManage = await this.leagueRepository.delete({id});
    return existingManage;
  }


  async getPage(page: number, limit: number): Promise<League[]>{
    const skip = (page - 1) * limit;
    return  await this.leagueRepository.find({ skip, take: limit });
  }


  async getTotalRecords(): Promise<number> {
    return await this.leagueRepository.count();
  }
  

  
  async getMatchOfLeague():Promise<League[]>{
    return await this.leagueRepository.find({relations: {sheduleMatchs: true}})
   }


  async getTeamOfLeague(id: number):Promise<League[]>{
    return await this.leagueRepository.find({
        relations:{ teams: true},
        where :{
          id :id 
        }
      })
  }

  async findLeague(key: any):Promise<League[]>{
      return await this.leagueRepository.createQueryBuilder().select()
        .where('nameleague ILIKE :searchQuery', { searchQuery: `%${key}%` })
        .orWhere('area ILIKE :searchQuery', { searchQuery: `%${key}%` })
        .orderBy('nameleague', 'DESC')
        .getMany();
  }

  
}
