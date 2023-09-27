import { HttpException, HttpStatus, Inject, Injectable, forwardRef } from '@nestjs/common';
import { SheduleMatch } from './entities/shedule-match.entity';
import { LessThan, MoreThan, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { response } from 'express';
import { Shedule_matchRepositoty } from './repository/shedule_match.repository';
import { CreateSheduleMatchDto } from './dto/create-shedule-match.dto';
import { StandingService } from '../standing/standing.service';
import { LeagueTeamService } from '../league-team/league-team.service';
import { format, startOfDay } from 'date-fns';
import { HomeAwayEnum } from '../standing/enum/standing.enum';


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


create(shedule:CreateSheduleMatchDto):Promise<SheduleMatch> {
  // const matchDate =  new Date(shedule.date +' '+ shedule.time)
  // const timestamp = matchDate.getTime();
  // const date = new Date(timestamp); 
  // const dateUTC  = new Date(date.toISOString());
  // const shedule_match = new SheduleMatch()
  // shedule_match.timeMatch = dateUTC
  // shedule_match.date = shedule.date
  // shedule_match.time = shedule.time
  // shedule_match.matchvenue = shedule.matchvenue
  // shedule_match.date = shedule.date

    return this.sheduleRepository.save(shedule);
    
  }


async  findAll() {
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




async GetComment(id : number){
  return await this.sheduleRepository.find({where:{id: id},relations: {userComment:true}})
}


async update(id: number, updateData: Partial<CreateSheduleMatchDto>): Promise<SheduleMatch> {
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




async addTeamPlay(id:number,teamPlay:Partial<CreateSheduleMatchDto>){
    
    const homeTeam = (teamPlay as any).homeTeamId;
    const awayTeam = (teamPlay as any).awayTeamId;

    const leaguehomeid = await this.leagueteamService.findLeagueId(homeTeam);
    const leagueawayid = await this.leagueteamService.findLeagueId(awayTeam);
    const result = await this.checkIfAnyElementMatches(leaguehomeid, leagueawayid);
    if(result == true){
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
              
              await this.sheduleRepository
                .createQueryBuilder()
                .update('shedule_match')
                .set({
                  homeTeamId: homeTeam,
                  awayTeamId: awayTeam,
                  
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
               
               })
              .where("id =:id",{id: id})
              .execute()
               }

               throw new HttpException('inset two team  successfully!!!!!', HttpStatus.FORBIDDEN);
            }
        }else {  throw new HttpException('the two team different league!!!!!', HttpStatus.FORBIDDEN);}
  
   }



 
  
  




async remove(id:number){
    const existingManage = await this.sheduleRepository.delete({id});
    return existingManage;
  }




 


async enterGoal(id: number , goal : Partial<CreateSheduleMatchDto>){
  const findTeamP = await this.sheduleRepository.findBy({id})
  const  scoreWin = 3;
  const  scoreLose = 0;
  const  scoreDraw = 1;
  if(findTeamP[0].isProcessed != true){

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
const findTeamaway = await this.standingService.findTeamLeagueId(findTeamP[0].awayTeamId);
const findTeamhome = await this.standingService.findTeamLeagueId(findTeamP[0].homeTeamId);


if(findTeamaway== null && findTeamhome== null){
    if(goal.goalAway > goal.goalHome){
      await Promise.all([
        this.standingService.saveScore( goal.goalAway,goal.goalHome,1,3,findTeamP[0].awayTeamId,findTeamP[0].leagueId),
        this.standingService.saveScore( goal.goalHome,goal.goalAway,1,0,findTeamP[0].homeTeamId,findTeamP[0].leagueId)
      ])
    }else if(goal.goalAway < goal.goalHome){
      await Promise.all([
        this.standingService.saveScore( goal.goalAway,goal.goalHome,1,0,findTeamP[0].awayTeamId,findTeamP[0].leagueId),
        this.standingService.saveScore( goal.goalHome,goal.goalAway,1,3,findTeamP[0].homeTeamId,findTeamP[0].leagueId)
      ])
    }else if(goal.goalAway == goal.goalHome){
      await Promise.all([
        this.standingService.saveScore( goal.goalAway,goal.goalHome,1,1,findTeamP[0].awayTeamId,findTeamP[0].leagueId),
        this.standingService.saveScore( goal.goalAway,goal.goalHome,1,1,findTeamP[0].homeTeamId,findTeamP[0].leagueId)
      ])     
    }
}

  else if(findTeamaway== null && findTeamhome!= null){
    // check league different
    if(findTeamhome == findTeamP[0].leagueId ){
    if(goal.goalAway > goal.goalHome){
      await Promise.all([
        this.standingService.saveScore( goal.goalAway,goal.goalHome,1,3,findTeamP[0].awayTeamId,findTeamP[0].leagueId),
        this.standingService.updateScore(findTeamP[0].homeTeamId,scoreLose,goal.goalHome,goal.goalAway) 
       ]);
    }else if(goal.goalAway < goal.goalHome){
      await Promise.all([
        this.standingService.saveScore( goal.goalHome,goal.goalAway,1,0,findTeamP[0].awayTeamId,findTeamP[0].leagueId),
        this.standingService.updateScore(findTeamP[0].homeTeamId,scoreWin,goal.goalAway,goal.goalHome) 
      ])

    }else if(goal.goalAway == goal.goalHome){
      await Promise.all([
        this.standingService.saveScore( goal.goalAway,goal.goalHome,1,1,findTeamP[0].awayTeamId,findTeamP[0].leagueId),
        this.standingService.updateScore(findTeamP[0].homeTeamId,scoreDraw,goal.goalHome,goal.goalAway)
      ]) 
    }
   } else {
    if(goal.goalAway > goal.goalHome){
       await Promise.all([
        this.standingService.saveScore( goal.goalAway,goal.goalHome,1,3,findTeamP[0].awayTeamId,findTeamP[0].leagueId),
        this.standingService.saveScore( goal.goalHome,goal.goalAway,1,0,findTeamP[0].homeTeamId,findTeamP[0].leagueId)
       ])
    }else if(goal.goalAway < goal.goalHome){
       await Promise.all([
        this.standingService.saveScore( goal.goalAway,goal.goalHome,1,0,findTeamP[0].awayTeamId,findTeamP[0].leagueId),
        this.standingService.saveScore( goal.goalHome,goal.goalAway,1,3,findTeamP[0].homeTeamId,findTeamP[0].leagueId)
       ])
    }else if(goal.goalAway == goal.goalHome){
       await Promise.all([
        this.standingService.saveScore( goal.goalAway,goal.goalHome,1,1,findTeamP[0].awayTeamId,findTeamP[0].leagueId),
        this.standingService.saveScore( goal.goalAway,goal.goalHome,1,1,findTeamP[0].homeTeamId,findTeamP[0].leagueId)
       ])
    }
   }
  }
  else if(findTeamaway!= null && findTeamhome== null){ 
    // check league different
    if( findTeamaway == findTeamP[0].leagueId){
    if(goal.goalAway > goal.goalHome){
       await Promise.all([
        this.standingService.saveScore( goal.goalAway,goal.goalHome,1,0,findTeamP[0].homeTeamId,findTeamP[0].leagueId),
        this.standingService.updateScore(findTeamP[0].awayTeamId,scoreWin,goal.goalHome,goal.goalAway) 
       ])
    }else if(goal.goalAway < goal.goalHome){
       await Promise.all([
        this.standingService.saveScore( goal.goalHome,goal.goalAway,1,3,findTeamP[0].homeTeamId,findTeamP[0].leagueId),
        this.standingService.updateScore(findTeamP[0].awayTeamId,scoreLose,goal.goalAway,goal.goalHome)
       ]) 
    }else if(goal.goalAway == goal.goalHome){
       await Promise.all([
        this.standingService.saveScore( goal.goalAway,goal.goalHome,1,1,findTeamP[0].homeTeamId,findTeamP[0].leagueId),
        this.standingService.updateScore(findTeamP[0].awayTeamId,scoreDraw,goal.goalHome,goal.goalAway)
       ]) 
    }
  }
   else {
    if(goal.goalAway > goal.goalHome){
       await Promise.all([
        this.standingService.saveScore( goal.goalAway,goal.goalHome,1,3,findTeamP[0].awayTeamId,findTeamP[0].leagueId),
        this.standingService.saveScore( goal.goalHome,goal.goalAway,1,0,findTeamP[0].homeTeamId,findTeamP[0].leagueId)
       ])

    }else if(goal.goalAway < goal.goalHome){
      await Promise.all([
       this.standingService.saveScore( goal.goalAway,goal.goalHome,1,0,findTeamP[0].awayTeamId,findTeamP[0].leagueId),
       this.standingService.saveScore( goal.goalHome,goal.goalAway,1,3,findTeamP[0].homeTeamId,findTeamP[0].leagueId)
      ])
    }else if(goal.goalAway == goal.goalHome){
      await Promise.all([
       this.standingService.saveScore( goal.goalAway,goal.goalHome,1,1,findTeamP[0].awayTeamId,findTeamP[0].leagueId),
       this.standingService.saveScore( goal.goalAway,goal.goalHome,1,1,findTeamP[0].homeTeamId,findTeamP[0].leagueId)
      ])
    }
   }
  }
  else if(findTeamaway!= null && findTeamhome!= null){
          // check league diffrent
        if(findTeamaway == findTeamP[0].leagueId && findTeamhome == findTeamP[0].leagueId){
      if(goal.goalAway < goal.goalHome){
        await Promise.all([
         this.standingService.updateScore(findTeamP[0].homeTeamId,scoreWin,goal.goalHome,goal.goalAway), 
         this.standingService.updateScore(findTeamP[0].awayTeamId,scoreLose,goal.goalAway,goal.goalHome)  
        ])
      }
      else if(goal.goalAway > goal.goalHome){
        await Promise.all([
         this.standingService.updateScore(findTeamP[0].awayTeamId,scoreWin,goal.goalAway,goal.goalHome),  
         this.standingService.updateScore(findTeamP[0].homeTeamId,scoreLose,goal.goalHome,goal.goalAway)  
        ])
        }
      else if(goal.goalAway === goal.goalHome){
        await Promise.all([
         this.standingService.updateScore(findTeamP[0].homeTeamId,scoreDraw,goal.goalHome,goal.goalAway),  
         this.standingService.updateScore(findTeamP[0].awayTeamId,scoreDraw,goal.goalHome,goal.goalAway)  
        ])  
      }
    } else if(findTeamaway != findTeamP[0].leagueId && findTeamhome == findTeamP[0].leagueId){
    if(goal.goalAway > goal.goalHome){
      await Promise.all([
       this.standingService.saveScore( goal.goalAway,goal.goalHome,1,3,findTeamP[0].awayTeamId,findTeamP[0].leagueId),
       this.standingService.updateScore(findTeamP[0].homeTeamId,scoreLose,goal.goalHome,goal.goalAway) 
      ])
    }else if(goal.goalAway < goal.goalHome){
      await Promise.all([
       this.standingService.saveScore( goal.goalHome,goal.goalAway,1,0,findTeamP[0].awayTeamId,findTeamP[0].leagueId),
       this.standingService.updateScore(findTeamP[0].homeTeamId,scoreWin,goal.goalAway,goal.goalHome) 
      ])
    }else if(goal.goalAway == goal.goalHome){
      await Promise.all([
       this.standingService.saveScore( goal.goalAway,goal.goalHome,1,1,findTeamP[0].awayTeamId,findTeamP[0].leagueId),
       this.standingService.updateScore(findTeamP[0].homeTeamId,scoreDraw,goal.goalHome,goal.goalAway) 
      ])
    }
  }
     else if( findTeamaway == findTeamP[0].leagueId && findTeamhome != findTeamP[0].leagueId){
    if(goal.goalAway > goal.goalHome){
      await Promise.all([
       this.standingService.saveScore( goal.goalAway,goal.goalHome,1,0,findTeamP[0].homeTeamId,findTeamP[0].leagueId),
       this.standingService.updateScore(findTeamP[0].awayTeamId,scoreWin,goal.goalHome,goal.goalAway) 
      ])
    }else if(goal.goalAway < goal.goalHome){
      await Promise.all([
       this.standingService.saveScore( goal.goalHome,goal.goalAway,1,3,findTeamP[0].homeTeamId,findTeamP[0].leagueId),
       this.standingService.updateScore(findTeamP[0].awayTeamId,scoreLose,goal.goalAway,goal.goalHome) 
      ])
    }else if(goal.goalAway == goal.goalHome){
      await Promise.all([
       this.standingService.saveScore( goal.goalAway,goal.goalHome,1,1,findTeamP[0].homeTeamId,findTeamP[0].leagueId),
       this.standingService.updateScore(findTeamP[0].awayTeamId,scoreDraw,goal.goalHome,goal.goalAway) 
      ])
    }
     }       
  }
      throw new HttpException('enter goal successfully!!!!!', HttpStatus.FORBIDDEN);
    }
    else {     
      throw new HttpException('this match has been update!!!!!', HttpStatus.FORBIDDEN);
    }
  }


  getFormattedTodayDate(): string {
    const today = startOfDay(new Date());
    const formattedToday = format(today, 'yyyy-MM-dd');
    return formattedToday;
  }

  async getHistoryMatch(teamId:number): Promise<SheduleMatch[]>{
    return  await this.sheduleRepository.find({
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



  // async getLast5MatchHome(standingQuery:HomeAwayEnum,standing: any,leagueId:number):Promise<{score: number; teamId: number}[]>{
    
  //   if(standingQuery == HomeAwayEnum.Home){
  //     let results: any[] = [];
  //     let total = 0;
  //     for (let i = 0; i < standing.length; i++) {
  //       const homeMatch = await this.sheduleRepository.find({ where: { homeTeamId : standing[i], leagueId: leagueId }})
  //      for (let j = 0; j < homeMatch.length; j++) {
  //        const match = homeMatch[j];
  //        const goalAway = match.goalAway;
  //        const goalHome = match.goalHome;
  //        if( goalAway < goalHome){
  //          results.push({score :total + 3, teamId :standing[i]})
  //       }else if( goalAway == goalHome){
  //         results.push({score :total + 1, teamId :standing[i]})
  //       } 
  //       else if( goalAway > goalHome){
  //        results.push({score :total + 0, teamId :standing[i]})
  //      } 
        
  //      } 
  //    }
  //    return results
  //   } else {
  //     let results = [];
  //     let total = 0;
  //     for (let i = 0; i < standing.length; i++) {
  //       const homeMatch = await this.sheduleRepository.find({ where: { homeTeamId : standing[i], leagueId: leagueId }})
  //      for (let j = 0; j < homeMatch.length; j++) {
  //        const match = homeMatch[j];
  //        const goalAway = match.goalAway;
  //        const goalHome = match.goalHome;
  //        if( goalAway > goalHome){
  //          results.push({score :total + 3, teamId :standing[i]})
  //       }else if( goalAway == goalHome){
  //         results.push({score :total + 1, teamId :standing[i]})
  //       } 
  //       else if( goalAway < goalHome){
  //        results.push({score :total + 0, teamId :standing[i]})
  //      } 
        
  //      } 
  //    }
  //    return results
  //   }
      
  //   }






    
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
