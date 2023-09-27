import { Body, Inject, Injectable, Param, Post, forwardRef } from '@nestjs/common';
import { CreatePlayerDto } from './dto/create-player.dto';
import { UpdatePlayerDto } from './dto/update-player.dto';
import { Player } from './entities/player.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository,  } from 'typeorm';
import { Team } from '../team/entities/team.entity';
import { PlayerRepository } from './repository/play.repository';
import { TeamService } from '../team/team.service';
import { te } from 'date-fns/locale';

@Injectable()
export class PlayerService {
  constructor(@InjectRepository(Player)
              private playerRepository: PlayerRepository,
              @Inject(forwardRef(() => TeamService))
              private teamService : TeamService
  ){}
  
  async create(createPlayDto:CreatePlayerDto ):Promise<CreatePlayerDto>{
    await this.playerRepository.insert(createPlayDto);
    return createPlayDto;
  }

  async findAll(): Promise<CreatePlayerDto[]> {
    return this.playerRepository.find();
  }

  async delete(id:number){
    const existingManage = await this.playerRepository.delete({id});
    return existingManage;
  }
 
  async update(id: number, updateData: Partial<CreatePlayerDto>): Promise<Player> {
    const existingManage = await this.playerRepository.findOneBy({id});
    if (!existingManage) {
      
    }
    Object.assign(existingManage, updateData);
    return this.playerRepository.save(existingManage);
  }

  async assignPlayerToTeam(teamId: number, id: number) {

    const player = await this.playerRepository.find({where:{id}})
    if (!player) {
      console.log('do have not player')
     }
    
    const team = await this.teamService.findTeamId(teamId);
    if(team == null){
      return 'do not have team';
    }
     await this.playerRepository.update(id ,  { team: { id: teamId } })
    
  }




 
  async findPlayer(key: any){
      return await this.playerRepository.createQueryBuilder().select()
    //.where('(playername ILIKE :searchQuery OR nationnality ILIKE :searchQuery OR position ILIKE :searchQuery  )', { searchQuery: `%${key}%` })
    .where('playername ILIKE :searchQuery', { searchQuery: `%${key}%` })
    .orWhere('nationnality ILIKE :searchQuery', { searchQuery: `%${key}%` })
    .orWhere('position ILIKE :searchQuery', { searchQuery: `%${key}%` })
    .orderBy('position', 'DESC')
    .orderBy('nationnality', 'DESC')
    .orderBy('playername', 'DESC')
    .getMany();
  
    }


}
