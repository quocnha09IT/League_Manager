import { Body, Injectable, Param, Post } from '@nestjs/common';
import { CreatePlayerDto } from './dto/create-player.dto';
import { UpdatePlayerDto } from './dto/update-player.dto';
import { Player } from './entities/player.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, getConnection } from 'typeorm';
import { Team } from '../team/entities/team.entity';

@Injectable()
export class PlayerService {
  constructor(@InjectRepository(Player)
  private playerRepository: Repository<Player>,
  @InjectRepository(Team)
  private teamRepository: Repository<Team>,){}
  
  async create(@Body()player:Player ):Promise<Player>{
    await this.playerRepository.insert(player);
    return player;
  }

  async findAll(): Promise<Player[]> {
    return this.playerRepository.find();
  }

  async delete(id:number){
    const existingManage = await this.playerRepository.delete({id});
    return existingManage;
  }
 
  async update(id: number, updateData: Partial<Player>): Promise<Player> {
    const existingManage = await this.playerRepository.findOneBy({id});
    if (!existingManage) {
      
    }
    Object.assign(existingManage, updateData);
    return this.playerRepository.save(existingManage);
  }

  async assignPlayerToTeam(teamId: Partial<Player>, id: number) {
      
    const player = await this.playerRepository.query(`SELECT * FROM player WHERE id = ${id}`);
    if (!player) {
      throw new Error('Player not found');
     }
    
    const team = await this.teamRepository.query(`SELECT * FROM team  WHERE id = ${teamId}`);
    if (!team) {
      throw new Error('Team not found');
    }
    await this.playerRepository.query(`UPDATE player SET "teamId" = ${teamId}  WHERE id = ${id}`);
    
  }
}
