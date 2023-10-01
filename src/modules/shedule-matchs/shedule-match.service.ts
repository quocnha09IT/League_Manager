import { HttpException, HttpStatus, Inject, Injectable, forwardRef } from '@nestjs/common';
import { SheduleMatch } from './entities/shedule-match.entity';
import { LessThan, MoreThan, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { response } from 'express';
import { Shedule_matchRepositoty } from './repositories/shedule_match.repository';
import { CreateSheduleMatchDto } from './http/dto/create-shedule-match.dto';
import { StandingService } from '../standings/standing.service';
import { LeagueTeamService } from '../league-teams/league-team.service';
import { format, startOfDay } from 'date-fns';
import { HomeAwayEnum } from '../standings/enum/standing.enum';

@Injectable()
export class SheduleMatchService {
  private formattedToday: string;
  constructor(@InjectRepository(SheduleMatch)
    private sheduleRepository: Shedule_matchRepositoty,
    @Inject(forwardRef(() => StandingService))
    private standingService: StandingService,
    private leagueteamService: LeagueTeamService,
  ){
    this.formattedToday = this.getFormattedTodayDate();
   }

createScheduleMatch(shedule:CreateSheduleMatchDto):Promise<SheduleMatch> {
    return this.sheduleRepository.save(shedule);   
  }

async findAll() {
  const schedules = await this.sheduleRepository.find({
    relations: ['homeTeam', 'awayTeam'],
    order:{
      date:"DESC",
      time:"ASC"
    },
    take: 2,

  });
  return schedules;
  }

async updateScheduleMatch(id: number, updateData: Partial<CreateSheduleMatchDto>): Promise<SheduleMatch> {
    const existingManage = await this.sheduleRepository.findOneBy({id});
    if (!existingManage) {   
    }
    Object.assign(existingManage, updateData);
    return this.sheduleRepository.save(existingManage);
  }

async checkIfAnyElementMatches(arr1: number[], arr2: number[]): Promise<boolean> {
    const exists = arr1.some(element => arr2.includes(element));
    return exists;
  }

async addTeamPlay(id:number,teamPlay:Partial<CreateSheduleMatchDto>): Promise<{message: string}>{
    const homeTeam = (teamPlay as any).homeTeamId;
    const awayTeam = (teamPlay as any).awayTeamId;
    const leaguehomeid = await this.leagueteamService.findLeagueId(homeTeam);
    const leagueawayid = await this.leagueteamService.findLeagueId(awayTeam);
    const result = await this.checkIfAnyElementMatches(leaguehomeid, leagueawayid);
    if(result === true){
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
          if(count >= 2){
            if(uniqueAwayTeamIds == undefined && uniqueHomeTeamIds == undefined){        
              await this.sheduleRepository.update(id,{  homeTeamId: homeTeam,awayTeamId: awayTeam,});
            }
            else{
              throw new HttpException('this is team has been shedule macth!!!!!', HttpStatus.FORBIDDEN)
             }
            }else{ 
            await this.sheduleRepository.update(id,{  homeTeamId: homeTeam,awayTeamId: awayTeam,}); 
            }
               return { message: 'inset two team  successfully!!!!!' };
            }
        }else {  throw new HttpException('the two team different league!!!!!', HttpStatus.FORBIDDEN);}
  
   }

  async calculateForTeamFisrtScore(goalHome: number, goalAway: number, awayTeamId:number, homeTeamId: number, leagueId: number ){
    if(goalHome > goalAway){
       await Promise.all([
        this.standingService.saveScore( goalAway,goalHome,1,3,awayTeamId,leagueId),
        this.standingService.saveScore( goalHome,goalAway,1,0,homeTeamId,leagueId)
      ])
    }
    if(goalAway > goalHome){
       await Promise.all([
        this.standingService.saveScore( goalAway,goalHome,1,0,awayTeamId,leagueId),
        this.standingService.saveScore( goalHome,goalAway,1,3,homeTeamId,leagueId)
      ])
    }
    
    if(goalAway == goalHome){
       await Promise.all([
        this.standingService.saveScore( goalAway,goalHome,1,1,awayTeamId,leagueId),
        this.standingService.saveScore( goalHome,goalHome,1,1,homeTeamId,leagueId)
      ])     
    }
   }

   async calculateScoreSameLeagueIdNewTeamAway(goalAway: number, goalHome: number,awayTeamId: number ,homeTeamId:number ,leagueId: number){
    if(goalAway > goalHome){
      await Promise.all([
        this.standingService.saveScore( goalAway,goalHome,1,3,awayTeamId,leagueId),
        this.standingService.updateScore(homeTeamId,0,goalHome,goalAway) 
       ]);
    }else if(goalAway < goalHome){
      await Promise.all([
        this.standingService.saveScore( goalHome,goalAway,1,0,awayTeamId,leagueId),
        this.standingService.updateScore(homeTeamId,3,goalAway,goalHome) 
      ])

    }else if(goalAway === goalHome){
      await Promise.all([
        this.standingService.saveScore( goalAway,goalHome,1,1,awayTeamId,leagueId),
        this.standingService.updateScore(homeTeamId,1,goalHome,goalAway)
      ]) 
    }
   }

async calculateScoreSameLeagueIdNewTeamHome(goalAway: number, goalHome: number,awayTeamId: number ,homeTeamId:number ,leagueId: number){
   if(goalAway > goalHome){
    await Promise.all([
     this.standingService.saveScore( goalAway,goalHome,1,0,homeTeamId,leagueId),
     this.standingService.updateScore(awayTeamId,3,goalHome,goalAway) 
    ])
 }else if(goalAway < goalHome){
    await Promise.all([
     this.standingService.saveScore( goalHome,goalAway,1,3,homeTeamId,leagueId),
     this.standingService.updateScore(awayTeamId,0,goalAway,goalHome)
    ]) 
 }else if(goalAway == goalHome){
    await Promise.all([
     this.standingService.saveScore( goalAway,goalHome,1,1,homeTeamId,leagueId),
     this.standingService.updateScore(awayTeamId,1,goalHome,goalAway)
    ]) 
 }
}

async calculateScoreSameLeagueId(goalAway: number, goalHome: number,awayTeamId: number ,homeTeamId:number ,leagueId: number){
  if(goalAway < goalHome){
    await Promise.all([
     this.standingService.updateScore(homeTeamId,3,goalHome,goalAway), 
     this.standingService.updateScore(awayTeamId,0,goalAway,goalHome)  
    ])
  }
  else if(goalAway > goalHome){
    await Promise.all([
     this.standingService.updateScore(awayTeamId,3,goalAway,goalHome),  
     this.standingService.updateScore(homeTeamId,0,goalHome,goalAway)  
    ])
    }
  else if(goalAway === goalHome){
    await Promise.all([
     this.standingService.updateScore(homeTeamId,1,goalHome,goalAway),  
     this.standingService.updateScore(awayTeamId,1,goalHome,goalAway)  
    ])  
  }
}
 
async remove(id:number){
    const existingManage = await this.sheduleRepository.delete({id});
    return existingManage;
  }

async enterGoal(id: number , goal : Partial<SheduleMatch>):Promise<{message: string}>{
  const findOneTeam = await this.sheduleRepository.findBy({id})
  if(findOneTeam[0].isProcessed != true){
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
const findTeamAway = await this.standingService.findTeamLeagueId(findOneTeam[0].awayTeamId);
const findTeamHome = await this.standingService.findTeamLeagueId(findOneTeam[0].homeTeamId);
  if(findTeamAway === null && findTeamHome === null){
    await this.calculateForTeamFisrtScore(goal.goalHome, goal.goalAway, findOneTeam[0].awayTeamId, findOneTeam[0].homeTeamId, findOneTeam[0].leagueId)
  }
  else if(findTeamAway === null && findTeamHome!= null){
    if(findTeamHome == findOneTeam[0].leagueId ){
      await this.calculateScoreSameLeagueIdNewTeamAway(goal.goalAway, goal.goalHome,findOneTeam[0].awayTeamId ,findOneTeam[0].homeTeamId ,findOneTeam[0].leagueId)
    } 
    else {
      await this.calculateForTeamFisrtScore(goal.goalHome, goal.goalAway, findOneTeam[0].awayTeamId, findOneTeam[0].homeTeamId, findOneTeam[0].leagueId)
    }
  }
  else if(findTeamAway != null && findTeamHome === null){ 
    if( findTeamAway === findOneTeam[0].leagueId){
      await this.calculateScoreSameLeagueIdNewTeamHome(goal.goalAway, goal.goalHome,goal.awayTeamId ,findOneTeam[0].homeTeamId ,findOneTeam[0].leagueId)
    }
    else{
    await this.calculateForTeamFisrtScore(goal.goalHome, goal.goalAway, findOneTeam[0].awayTeamId, findOneTeam[0].homeTeamId, findOneTeam[0].leagueId)
    }
  }
  else if(findTeamAway!= null && findTeamHome!= null){
    if(findTeamAway == findOneTeam[0].leagueId && findTeamHome == findOneTeam[0].leagueId){
      await this.calculateScoreSameLeagueId(goal.goalAway, goal.goalHome,findOneTeam[0].awayTeamId ,findOneTeam[0].homeTeamId ,findOneTeam[0].leagueId)    
    } 
    else if(findTeamAway != findOneTeam[0].leagueId && findTeamHome == findOneTeam[0].leagueId){
      await this.calculateScoreSameLeagueIdNewTeamAway(goal.goalAway, goal.goalHome,goal.awayTeamId ,findOneTeam[0].homeTeamId ,findOneTeam[0].leagueId)
    }
    else if( findTeamAway == findOneTeam[0].leagueId && findTeamHome != findOneTeam[0].leagueId){
      await this.calculateScoreSameLeagueIdNewTeamHome(goal.goalAway, goal.goalHome,goal.awayTeamId ,findOneTeam[0].homeTeamId ,findOneTeam[0].leagueId)
    } 
    else if(findTeamAway != findOneTeam[0].leagueId && findTeamHome != findOneTeam[0].leagueId){
      if(goal.goalAway > goal.goalHome){
        await this.calculateForTeamFisrtScore(goal.goalHome, goal.goalAway, findOneTeam[0].awayTeamId, findOneTeam[0].homeTeamId, findOneTeam[0].leagueId)   
      }
     }       
    }
    return { message: 'enter goal successfully!!!!!' };
  }
  else{     
      throw new HttpException('this match has been update!!!!!', HttpStatus.FORBIDDEN);
  }
}

  getFormattedTodayDate(): string {
    const today = startOfDay(new Date());
    const formattedToday = format(today, 'yyyy-MM-dd');
    return formattedToday;
  }

  async getHistoryMatch(teamId:number): Promise<SheduleMatch[]>{
    return await this.sheduleRepository.find({
      where: {
        date: LessThan(this.formattedToday), 
        homeTeamId: teamId, 
      },
    })
  }

  async getLast5MatchAway(standing : any, leagueId: number):Promise<{teamId:number,lastFive:string[]}[]>{
    const getLast5: { teamId: number, lastFive: string[] }[] = [];
    for (let i = 0; i < standing.length; i++) {
      const awayMatch = await this.sheduleRepository.find({ where: { awayTeamId: standing[i], leagueId: leagueId },
        order:{
          date: "DESC"
        },
        take: 5
      });
      const last5Match: string[] = [];
    for (let j = 0; j < awayMatch.length; j++) {
      const match = awayMatch[j];
      const goalAway = match.goalAway;
      const goalHome = match.goalHome;
    let result = ''; 
    if (goalAway > goalHome) {
      result = 'W'; 
    } else if (goalAway < goalHome) {
      result = 'L'; 
    } else if(goalAway == goalAway){
      result = 'D'
    }
    last5Match.push(result );
  }
    getLast5.push({ teamId: standing[i], lastFive: last5Match });
  }
    return getLast5
  }
  
  async getLast5MatchHome(standing : any, leagueId: number):Promise<{teamId:number,lastFive:string[]}[]>{
    const getLast5: { teamId: number, lastFive: string[] }[] = [];
    for (let i = 0; i < standing.length; i++) {
      const homeMatch = await this.sheduleRepository.find({ where: { homeTeamId: standing[i], leagueId: leagueId },
        order:{
          date: "DESC"
        },
        take: 5
      });
      const last5Match: string[] = [];
    for (let j = 0; j < homeMatch.length; j++) {
      const match = homeMatch[j];
      const goalAway = match.goalAway;
      const goalHome = match.goalHome;
    let result = ''; 
    if (goalAway < goalHome) {
      result = 'W'; 
    } else if (goalAway > goalHome) {
      result = 'L'; 
    }else if(goalAway == goalAway){
      result = 'D'
    }
    last5Match.push( result );
  }
    getLast5.push({ teamId: standing[i],  lastFive: last5Match });
  }
    return getLast5
  }
  
  async getStandingHomeAway(standingQuery:HomeAwayEnum,standing: any,leagueId:number):Promise<{score: number; teamId: number}[]>{
    if(standingQuery == HomeAwayEnum.Home){
      let results: any[] = [];
      let total = 0;
      for (let i = 0; i < standing.length; i++) {
        const homeMatch = await this.sheduleRepository.find({ where: { homeTeamId : standing[i], leagueId: leagueId }})
       for (let j = 0; j < homeMatch.length; j++) {
         const match = homeMatch[j];
         const goalAway = match.goalAway;
         const goalHome = match.goalHome;
         if( goalAway < goalHome){
           results.push({score :total + 3, teamId :standing[i]})
        }else if( goalAway == goalHome){
          results.push({score :total + 1, teamId :standing[i]})
        } 
        else if( goalAway > goalHome){
         results.push({score :total + 0, teamId :standing[i]})
       } 
       } 
     }
     return results
    } else {
      let results = [];
      let total = 0;
      for (let i = 0; i < standing.length; i++) {
        const homeMatch = await this.sheduleRepository.find({ where: { awayTeamId : standing[i], leagueId: leagueId }})
       for (let j = 0; j < homeMatch.length; j++) {
         const match = homeMatch[j];
         const goalAway = match.goalAway;
         const goalHome = match.goalHome;
         if( goalAway > goalHome){
           results.push({score :total + 3, teamId :standing[i]})
        }else if( goalAway == goalHome){
          results.push({score :total + 1, teamId :standing[i]})
        } 
        else if( goalAway < goalHome){
         results.push({score :total + 0, teamId :standing[i]})
       }
       } 
     }
     return results
    }
      
    }   
}
