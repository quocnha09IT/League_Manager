import { Body, HttpStatus, Injectable } from '@nestjs/common';
import { CreateLeagueDto } from './dto/create-league.dto';
import { UpdateLeagueDto } from './dto/update-league.dto';
import { League } from './entities/league.entity';
import { UserService } from '../user/user.service';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../user/entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class LeagueService {
  constructor(@InjectRepository(League)
              private leagueRepository: Repository<League>
  ){}

  async create(leagueDto : CreateLeagueDto, createdBy: User ):Promise<League>{
    const league = new League();
     league.nameLeague = leagueDto.nameLeague;
     league.area = leagueDto.area;
     league.level = leagueDto.level;
     league.sport = leagueDto.sport;
     league.createdBy = createdBy;
    await this.leagueRepository.insert(league);
    return league;
  }

  async update(id: number, updateData: Partial<League>): Promise<League> {
    const existingManage = await this.leagueRepository.findOneBy({id});
    if (!existingManage) {
      
    }
    Object.assign(existingManage, updateData);
    return this.leagueRepository.save(existingManage);
  }

  async delete(id:number){
    const existingManage = await this.leagueRepository.delete({id});
    return existingManage;
  }

 
  async getPage(page: number, limit: number): Promise<League[]>{

    const skip = (page - 1) * limit;
    return this.leagueRepository.find({ skip, take: limit });
  }

  async getTotalRecords(): Promise<number> {
    return this.leagueRepository.count();
  }

  
}
