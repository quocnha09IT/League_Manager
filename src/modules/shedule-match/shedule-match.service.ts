import { Injectable } from '@nestjs/common';
import { SheduleMatch } from './entities/shedule-match.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { response } from 'express';
import { Shedule_matchRepositoty } from './repository/shedule_match.repository';
import { CreateSheduleMatchDto } from './dto/create-shedule-match.dto';


@Injectable()
export class SheduleMatchService {
  query(arg0: string) {
    throw new Error('Method not implemented.');
  }
  constructor(@InjectRepository(SheduleMatch)
  private sheduleRepository: Shedule_matchRepositoty){}

async create(shedule:CreateSheduleMatchDto):Promise<SheduleMatch> {
    return this.sheduleRepository.save(shedule);
    
  }


async  findAll() {
  const schedules = await this.sheduleRepository.find({
    relations: ['homeTeam', 'awayTeam'],
  });
  return schedules;
  }



async  findOne(id: number) {
    return `This action returns a #${id} sheduleMatch`;
  }




async update(id: number, updateData: Partial<CreateSheduleMatchDto>): Promise<SheduleMatch> {
    const existingManage = await this.sheduleRepository.findOneBy({id});
    if (!existingManage) {
      
    }
    Object.assign(existingManage, updateData);
    return this.sheduleRepository.save(existingManage);
  }




async addTeamPlay(id:number,teamPlay:Partial<CreateSheduleMatchDto>){
    const existingManage = await this.sheduleRepository.findOneBy({id});
    
    if (!existingManage) {    
    }  
    const homeTeam = (teamPlay as any).homeTeamId;
    const awayTeam = (teamPlay as any).awayTeamId;
    if(homeTeam == awayTeam ){
      response.statusMessage = "The two teams can be the same"
    }
    
    const checkTime = await this.sheduleRepository.query(`SELECT "homeTeamId" , "awayTeamId","date"  FROM shedule_match `);
    
    const check = await this.sheduleRepository.query(`SELECT "homeTeamId" , "awayTeamId","date"  FROM shedule_match WHERE "id" = ${id}  `);


      const date = checkTime[0].date;
      const homeTeamPlay = checkTime[0].homeTeamId;
      const awayTeamPlay = checkTime[0].awayTeamId;
      const datePlay = check[0].date;
      const areEqual = date.getTime() === datePlay.getTime();
      const checkHomeLeague = await this.sheduleRepository.query(`SELECT "leagueId"   FROM team WHERE "id" = ${homeTeam}  `);
      const checkAwayLeague = await this.sheduleRepository.query(`SELECT "leagueId"   FROM team WHERE "id" = ${awayTeam}  `);
      const CheckHomeLeague = checkHomeLeague[0].leagueId;
      const CheckAwayLeague = checkAwayLeague[0].leagueId;


      if(CheckHomeLeague === CheckAwayLeague ){
        if(areEqual){
          if(homeTeam == homeTeamPlay || awayTeam == awayTeamPlay || homeTeam == awayTeamPlay || awayTeam ==  homeTeamPlay){
            response.statusMessage = "the team has a shedule";
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
      else{
         console.log('the two team must be the same!!!!!')
      }
      

    
   
     
   }




async remove(id:number){
    const existingManage = await this.sheduleRepository.delete({id});
    return existingManage;
  }



async enterGoal(id: number , goal : Partial<CreateSheduleMatchDto>){
  const a = await this.sheduleRepository.query(`SELECT * FROM shedule_match WHERE id = ${id}`)


  if(a[0].isProcessed != true){

   await this.sheduleRepository.query(`UPDATE shedule_match SET "goalAway" = $1, "goalHome" = $2, "isProcessed" = true   WHERE id = $3`,
    [goal.goalAway, goal.goalHome, id])  

  // score of team
  
  const b = await this.sheduleRepository.query(`SELECT * FROM team WHERE id = ${a[0].awayTeamId}`)
  
    if(goal.goalAway > goal.goalHome){
    await this.sheduleRepository.query(`UPDATE team SET "score" = ${b[0].score + 3}, "numberGoal" = ${b[0].numberGoal + goal.goalAway},"concededGoal" = ${b[0].concededGoal + goal.goalHome}  WHERE id = ${a[0].awayTeamId}`)
    await this.sheduleRepository.query(`UPDATE team SET  "numberGoal" = ${b[0].numberGoal + goal.goalHome},"concededGoal" = ${b[0].concededGoal + goal.goalAway}  WHERE id = ${a[0].homeTeamId}`)
  }
  else if(goal.goalAway < goal.goalHome){
     await this.sheduleRepository.query(`UPDATE team SET "score" = ${b[0].score + 3}, "numberGoal" = ${b[0].numberGoal + goal.goalHome},"concededGoal" = ${b[0].concededGoal + goal.goalAway}  WHERE id = ${a[0].homeTeamId}`)
     await this.sheduleRepository.query(`UPDATE team SET  "numberGoal" = ${b[0].numberGoal + goal.goalAway},"concededGoal" = ${b[0].concededGoal + goal.goalHome}  WHERE id = ${a[0].awayTeamId}`)
    }
  else if(goal.goalAway === goal.goalHome){
    await this.sheduleRepository.query(`UPDATE team SET "score" = ${b[0].score + 1},"numberGoal" = ${b[0].numberGoal + goal.goalAway},"concededGoal" = ${b[0].concededGoal + goal.goalHome}  WHERE id = ${a[0].homeTeamId}`)
    await this.sheduleRepository.query(`UPDATE team SET "score" = ${b[0].score + 1}, "numberGoal" = ${b[0].numberGoal + goal.goalHome},"concededGoal" = ${b[0].concededGoal + goal.goalAway} WHERE id = ${a[0].awayTeamId}`)
  }

  return response.statusMessage= 'enter goal successfully..... ';
    }
    else {
      response.statusMessage = "this match has been update";
    }
  }
}
