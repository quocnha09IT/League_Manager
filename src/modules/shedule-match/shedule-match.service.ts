import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { SheduleMatch } from './entities/shedule-match.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { response } from 'express';
import { Shedule_matchRepositoty } from './repository/shedule_match.repository';
import { CreateSheduleMatchDto } from './dto/create-shedule-match.dto';
import { TeamService } from '../team/team.service';


@Injectable()
export class SheduleMatchService {
  constructor(@InjectRepository(SheduleMatch)
  private sheduleRepository: Shedule_matchRepositoty,
  private teamServide: TeamService,
  ){}

create(shedule:CreateSheduleMatchDto):Promise<SheduleMatch> {
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
    
    const homeTeam = (teamPlay as any).homeTeamId;
    const awayTeam = (teamPlay as any).awayTeamId;
    if(homeTeam === awayTeam ){
    
      throw new HttpException('the two team can not be the same!!!!!!!!!', HttpStatus.FORBIDDEN);
    }else
      {

      // get the date the user id input
      const check = await this.sheduleRepository.findBy({id});
      const datePlay = check[0].date;
    
      const [match,count] = await this.sheduleRepository.findAndCount({ where: {date : datePlay  } });
      const homeTeamIds = match.map(match => match.homeTeamId);
      const awayTeamIds = match.map(match => match.awayTeamId);

      const homeTeamIdsArray = homeTeamIds.filter(id => id !== null);
      const awayTeamIdsArray = awayTeamIds.filter(id => id !== null);
      
      const targetValues = [homeTeam, awayTeam];

      const uniqueHomeTeamIds = homeTeamIdsArray.find(id => targetValues.includes(id));
      const uniqueAwayTeamIds = awayTeamIdsArray.find(id => targetValues.includes(id));
      
      const shedule = await this.sheduleRepository.findOne({where:{id}})
      const sheduleMatchhHome = shedule.homeTeamId
      const sheduleMatchhAway = shedule.awayTeamId

      const checkLeagueHome = await this.teamServide.findLeague(sheduleMatchhHome);
      const checkLeagueAway = await this.teamServide.findLeague(sheduleMatchhAway);
      
      
        if(checkLeagueAway === checkLeagueHome){

      
          if(count >= 2){
            if(uniqueAwayTeamIds == undefined && uniqueHomeTeamIds == undefined){
                  
              await this.sheduleRepository
                .createQueryBuilder()
                .update('shedule_match')
                .set({
                  homeTeamId: homeTeam,
                  awayTeamId: awayTeam,
                  leagueId: checkLeagueAway
                  })
                .where("id =:id",{id: id})
                .execute()

            }
            else{
                throw new HttpException('this is team has been shedule macth!!!!!', HttpStatus.FORBIDDEN);
                }
          }else{
            await this.sheduleRepository
              .createQueryBuilder()
              .update('shedule_match')
              .set({
                homeTeamId: homeTeam,
                awayTeamId: awayTeam,
                leagueId: checkLeagueAway
               })
              .where("id =:id",{id: id})
              .execute()
          }
      }
      else{
        throw new HttpException('the two team different league!!!!!', HttpStatus.FORBIDDEN);
      }
    }
  
   }




async remove(id:number){
    const existingManage = await this.sheduleRepository.delete({id});
    return existingManage;
  }







async enterGoal(id: number , goal : Partial<CreateSheduleMatchDto>){
  const a = await this.sheduleRepository.findBy({id})

  if(a[0].isProcessed != true){

  // inser score home team and away team

await this.sheduleRepository
    .createQueryBuilder()
    .update('shedule_match')
    .set({
      goalAway: goal.goalAway,
      goalHome: goal.goalHome,
      isProcessed: true
      })
    .where("id =:id",{id: id})
    .execute()

  // calculate score of team
const findTeam = await this.teamServide.findTeam(a[0].awayTeamId);

// if  away team win
  if(goal.goalAway > goal.goalHome){
    // update score , number goal , conceded goal team win
await this.sheduleRepository
      .createQueryBuilder()
      .update('team')
      .set({
        score: findTeam[0].score + 3,
        numberGoal: findTeam[0].numberGoal + goal.goalAway,
        concededGoal: findTeam[0].concededGoal + goal.goalHome,
        matchPlayed: findTeam[0].matchPlayed + 1
      })
      .where("id=:id", {  id: a[0].awayTeamId})
      .execute()

    // update score , number goal , conceded goal team lose

await this.sheduleRepository
    .createQueryBuilder()
    .update('team')
    .set({
      score: findTeam[0].score + 0,
      numberGoal: findTeam[0].numberGoal + goal.goalHome,
      concededGoal: findTeam[0].concededGoal + goal.goalAway,
      matchPlayed: findTeam[0].matchPlayed + 1
    })
    .where("id=:id", {  id: a[0].homeTeamId})
    .execute()

  }
  // if home team win
  else if(goal.goalAway < goal.goalHome){
// update score , number goal , conceded goal team win
  await this.sheduleRepository
     .createQueryBuilder()
     .update('team')
     .set({
       score: findTeam[0].score + 3,
       numberGoal: findTeam[0].numberGoal + goal.goalHome,
       concededGoal: findTeam[0].concededGoal + goal.goalAway,
       matchPlayed: findTeam[0].matchPlayed + 1
     })
     .where("id=:id", {  id: a[0].homeTeamId})
     .execute()

// update score , number goal , conceded goal team lose
  await this.sheduleRepository
    .createQueryBuilder()
    .update('team')
    .set({
      score: findTeam[0].score + 0,
      numberGoal: findTeam[0].numberGoal + goal.goalAway,
      concededGoal: findTeam[0].concededGoal + goal.goalHome,
      matchPlayed: findTeam[0].matchPlayed + 1
    })
    .where("id=:id", {  id: a[0].awayTeamId})
    .execute()
    }

// if two team draw
  else if(goal.goalAway === goal.goalHome){

// update score , number goal , conceded goal team draw
     await this.sheduleRepository
     .createQueryBuilder()
     .update('team')
     .set({
       score: findTeam[0].score + 1,
       numberGoal: findTeam[0].numberGoal + goal.goalAway,
       concededGoal: findTeam[0].concededGoal + goal.goalHome,
       matchPlayed: findTeam[0].matchPlayed + 1
     })
     .where("id=:id", {  id: a[0].homeTeamId})
     .execute()

    
// update score , number goal , conceded goal team draw
    await this.sheduleRepository
     .createQueryBuilder()
     .update('team')
     .set({
       score: findTeam[0].score + 1,
       numberGoal: findTeam[0].numberGoal + goal.goalHome,
       concededGoal: findTeam[0].concededGoal + goal.goalAway,
       matchPlayed: findTeam[0].matchPlayed + 1
     })
     .where("id=:id", {  id: a[0].awayTeamId})
     .execute()

  }
      throw new HttpException('enter goal successfully!!!!!', HttpStatus.FORBIDDEN);
    }
    else {
      
      throw new HttpException('this match has been update!!!!!', HttpStatus.FORBIDDEN);
    }
  }
}
