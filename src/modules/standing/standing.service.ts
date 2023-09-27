import { Get, Inject, Injectable, forwardRef } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { StandingEntity } from "./entities/standing.entity";
import { StandingRepository } from "./repository/standing.repository";
import { SheduleMatchService } from "../shedule-match/shedule-match.service";
import { CreateDtoStanding } from "./dto/create-dto.standing";
import { HomeAwayEnum } from "./enum/standing.enum";
import { async } from "rxjs";

@Injectable()
export class StandingService {
    constructor(@InjectRepository(StandingEntity)
                private standingRepository: StandingRepository,
                @Inject(forwardRef(() => SheduleMatchService))
                private sheduleMatchService: SheduleMatchService,
    ){}


    async findTeam(id: number):Promise<StandingEntity>{
        const count =  await this.standingRepository.findOne({where:{teamId: id}})
        return count
    }

    async Getstanding():Promise<StandingEntity[]>{
        return await this.standingRepository.find()
    }

    async findTeamLeagueId(id: number):Promise<number|StandingEntity>{
        const count =  await this.standingRepository.findOne({where:{teamId: id}})
        if(count == null){
            return count 
        } else { 
            return count.leagueId
        }
        
    }

    async saveScore(goalAway : number,goalHome : number, matchPlayer : number,score : number, teamId : number,leagueId : number):Promise<void>{
        await this.standingRepository
            .createQueryBuilder()
            .insert()
            .into(StandingEntity)
            .values({
                score: score,
                numberGoal: goalAway,
                concededGoal: goalHome,
                matchPlayer: matchPlayer,
                teamId: teamId,
                leagueId: leagueId,
                    })
            .execute()
    }



    async updateScore(findTeam: number,score : number,numberGoal : number ,concededGoal : number){
        const match = await this.standingRepository.findOne({where:{teamId: findTeam}})
    
        await this.standingRepository
            .createQueryBuilder()
            .update('standing')
            .set({
                score: match.score + score,
                numberGoal: match.numberGoal + numberGoal ,
                concededGoal: match.concededGoal + concededGoal ,
                matchPlayer: match.matchPlayer + 1
                })
            .where("teamId=:id", {  id: match.teamId})
            .execute()
    }


   async standing(leagueid: number):Promise<StandingEntity[]>{
      const standing =  await this.standingRepository.find({
        where: { leagueId: leagueid },
        relations: { team: true },
        order: {
            score: 'DESC',
          }
      });
      return standing
    }



    async getLastFiveMatch(Standing:string,leagueid : number):Promise< {
      teamId: number;
      lastFive: string[];
      
  }[]>{
        const standinga = [];
        const standing = await  this.standing(leagueid)
        standing.forEach((standingEntity) => {
             standinga.push(standingEntity.teamId)     
        });
         const last5MatchAway = await this.sheduleMatchService.getLast5MatchAway(standinga, leagueid);
         const last5MatchHome = await this.sheduleMatchService.getLast5MatchHome(standinga, leagueid);
         const mergedData= [...last5MatchAway, ...last5MatchHome]
          .reduce((accumulator, item) => {
          const teamId = item.teamId;

          if (!accumulator[teamId]) {
            accumulator[teamId] = { "lastFives": [] };
            }

            accumulator[teamId]["lastFives"].push(...(item.lastFive || []));
            accumulator[teamId]["lastFives"].push(...(item.lastFive || []));

          return accumulator;
           }, {});

    
          if(Standing == HomeAwayEnum.All){
            return Object.values(mergedData);
          } else if( Standing == HomeAwayEnum.Home){
            return last5MatchHome;
          } else if( Standing == HomeAwayEnum.Away){
            return last5MatchAway;
          }
    }


    async addLastFiveToStandingAll(data) :Promise<StandingEntity[]>{
      const  standingAll = await data.standingall;
      const mergedData = await data.getLastFiveMatch;
      for (const item of standingAll) {
        const teamId = await item.teamId;
        if (mergedData.hasOwnProperty(teamId)) {
          item.lastFive = await mergedData[teamId].lastFives;
        }
      }
       return data
    }

// merged array 
    async mergedArray(resultArray: {
      teamId: number;
      score: number;
    }[], api1Map : Map<any ,any>):Promise<{teamId:number, score:number}[]>{
      resultArray.forEach((item) => {
        const existingData = api1Map.get(item.teamId);
        if (existingData) {
        existingData.score = item.score;
        }
        });

        return  resultArray
    }


  // check enum
  // async checkEnumHomAway(standingQuery: HomeAwayEnum,standingall:StandingEntity[], 
  //   standinbg: StandingEntity[],updatedApi1Data: any){
  //   if(standingQuery === HomeAwayEnum.All){
  //     return this.addLastFiveToStandingAll({standingall,standinbg})
  //   }else if(standingQuery === HomeAwayEnum.Home)
  //     {
  //       return  await this.addLastFivesToStanding(updatedApi1Data,standinbg) 
  //     }
  //     else if(standingQuery === HomeAwayEnum.Away)
  //        return  await this.addLastFivesToStanding(updatedApi1Data,standinbg) 
  // }



    // look stadingHome set score plus
    async lookStanding(standingHome : any, scoreMap: Map<any, any>){
      standingHome.forEach((item) => {
        const { score, teamId } = item;
        if (scoreMap.has(teamId)) {
          scoreMap.set(teamId, scoreMap.get(teamId) + score);
        } else {
          scoreMap.set(teamId, score);
        }
      });
       return standingHome
    }




     async addLastFivesToStanding(standingData, lastFivesData) {
      // Tạo một đối tượng để ánh xạ teamId với lastFives
      const lastFivesMap = {};
      for (const item of lastFivesData) {
        lastFivesMap[item.teamId] = await  item.lastFive;
      }
    
      // Cập nhật thông tin "lastFives" vào mảng "standing"
      for (const standingItem of standingData.standing) {
        const teamId = await standingItem.teamId;
        if (lastFivesMap.hasOwnProperty(teamId)) {
          standingItem.lastFive = await  lastFivesMap[teamId];
        }
      }
      return await standingData
    }



    async getStandingHomeAway(standingQuery:HomeAwayEnum ,leagugId: number){
      const standing = await  this.standing(leagugId)
      const standings = standing.map(st => st.teamId);
      const standingHome = await this.sheduleMatchService.getStandingHomeAway(standingQuery,standings, leagugId);
      const scoreMap = new Map();
     
      this.lookStanding(standingHome,scoreMap);
      const resultArray = Array.from(scoreMap.entries()).map(([teamId, totalScore]) => ({
        teamId,
        score: totalScore,
      }));
      
      const standinghome = await  this.standing(leagugId)
      const standingall = await  this.standing(leagugId)
      const api1Map = new Map();
      standinghome.forEach((item) => {
      api1Map.set(item.teamId, item);
      });


// Cập nhật giá trị score từ API dưới vào đối tượng Map
    this.mergedArray(resultArray,api1Map);
    const updatedApi1Data = { standing: [...api1Map.values()] };
    let StandingQuery = standingQuery
    let Idleague = leagugId
    const getLastFiveMatch = await this.getLastFiveMatch( StandingQuery , Idleague) 
    //this.checkEnumHomAway(standingQuery,standingall,standinbg,updatedApi1Data)

    if(standingQuery === HomeAwayEnum.All){
      return this.addLastFiveToStandingAll({standingall,getLastFiveMatch})
    }else if(standingQuery === HomeAwayEnum.Home){
      return  await this.addLastFivesToStanding(updatedApi1Data,getLastFiveMatch) 
       }
      else if(standingQuery === HomeAwayEnum.Away)
      return  await this.addLastFivesToStanding(updatedApi1Data,getLastFiveMatch) 

    }
   
}