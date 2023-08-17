import { Injectable } from '@nestjs/common';
import { SheduleMatch } from './entities/shedule-match.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { async } from 'rxjs';
import { response } from 'express';


@Injectable()
export class SheduleMatchService {
  query(arg0: string) {
    throw new Error('Method not implemented.');
  }
  constructor(@InjectRepository(SheduleMatch)
  private sheduleRepository: Repository<SheduleMatch>){}

async create(shedule:SheduleMatch):Promise<SheduleMatch> {
    return this.sheduleRepository.save(shedule);
    
  }


async  findAll() {
   const queryBuilder = this.sheduleRepository.createQueryBuilder('shedule-match')
    .leftJoinAndSelect('shedule-match.homeTeam', 'homeTeam')
    .leftJoinAndSelect('shedule-match.awayTeam', 'awayTeam')
    .getMany()
  return queryBuilder;
  }



async  findOne(id: number) {
    return `This action returns a #${id} sheduleMatch`;
  }




async update(id: number, updateData: Partial<SheduleMatch>): Promise<SheduleMatch> {
    const existingManage = await this.sheduleRepository.findOneBy({id});
    if (!existingManage) {
      
    }
    Object.assign(existingManage, updateData);
    return this.sheduleRepository.save(existingManage);
  }




async addTeamPlay(id:number,teamPlay:Partial<SheduleMatch>){
    const existingManage = await this.sheduleRepository.findOneBy({id});
    
    if (!existingManage) {    
    }  
    const homeTeam = (teamPlay as any).homeTeamId;
    const awayTeam = (teamPlay as any).awayTeamId;
    if(homeTeam == awayTeam ){
      
    }

    const checkTime = await this.sheduleRepository.query(`SELECT "date","time","homeTeamId","awayTeamId" FROM shedule_match  `);
    const check = await this.sheduleRepository.query(`SELECT "homeTeamId" , "awayTeamId","date"  FROM shedule_match WHERE "id" = ${id}  `);

      const date = checkTime[0].date;
      const homeTeamPlay = checkTime[0].homeTeamId;
      const awayTeamPlay = checkTime[0].awayTeamId;
      const datePlay = check[0].date;
      const areEqual = date.getTime() === datePlay.getTime();

    if(areEqual){
      if(homeTeam == homeTeamPlay || awayTeam == awayTeamPlay || homeTeam == awayTeamPlay || awayTeam ==  homeTeamPlay){
        console.log('the team has a shedule')
      }else{
         await this.sheduleRepository.query( `UPDATE shedule_match SET "homeTeamId" = $1, "awayTeamId" = $2 WHERE id = $3`,
            [homeTeam, awayTeam, id]);
      }
    } 
    else{  
        await this.sheduleRepository.query( `UPDATE shedule_match SET "homeTeamId" = $1, "awayTeamId" = $2 WHERE id = $3`,
            [homeTeam, awayTeam, id]);
    }
   
     
   }




async remove(id:number){
    const existingManage = await this.sheduleRepository.delete({id});
    return existingManage;
  }



async enterGoal(id: number , goal : Partial<SheduleMatch>){
  await this.sheduleRepository.query(`UPDATE shedule_match SET "goalAway" = $1, "goalHome" = $2 WHERE id = $3`,
  [goal.goalAway, goal.goalHome, id])

  return response.statusMessage= 'enter goal successfully..... ';
}
}
