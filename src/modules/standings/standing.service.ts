import { Get, Inject, Injectable, forwardRef } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { StandingEntity } from "./entities/standing.entity";
import { StandingRepository } from "./repositories/standing.repository";
import { SheduleMatchService } from "../shedule-matchs/shedule-match.service";
import { HomeAwayEnum } from "./enum/standing.enum";

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



    async updateScore(findTeam: number,score : number,numberGoal : number ,concededGoal : number):Promise<void>{
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

        const mergedData = last5MatchAway.map(item1 => {
          const item2 = last5MatchHome.find(item2 => item2.teamId === item1.teamId) || {lastFive: []};
          return {
            teamId: item1.teamId,
            lastFive: [...item1.lastFive, ...item2.lastFive]
          }
        })
          if(Standing == HomeAwayEnum.All){
            return mergedData;
          } else if( Standing == HomeAwayEnum.Home){
            return last5MatchHome;
          } else if( Standing == HomeAwayEnum.Away){
            return last5MatchAway;
          }
    }

    async addLastFiveToStandingAll(data) :Promise<StandingEntity[]>{
      const  standingAll = await data.standingall;
      const getLastFiveMatch = await data.getLastFiveMatch;
      const getLastFiveMatchMap = new Map(getLastFiveMatch.map(item => [item.teamId, item]))

      const mapData = standingAll.map(item => {
        const lastFive = getLastFiveMatchMap.get(item.teamId);
        return {
          ...item,
          lastFive: lastFive ? lastFive: []
        }
      })
       return mapData
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

    // look stadingHome set score plus
    async loopStanding(standingHome : any, scoreMap: Map<any, any>){
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
      const lastFivesMap = {};
      for (const item of lastFivesData) {
        lastFivesMap[item.teamId] = await  item.lastFive;
      }
      for (const standingItem of standingData.standing) {
        const teamId = await standingItem.teamId;
        if (lastFivesMap.hasOwnProperty(teamId)) {
          standingItem.lastFive = await  lastFivesMap[teamId];
        }
      }
      return await standingData
    }

    async getStandingHomeAway(standingQuery:HomeAwayEnum ,leagueId: number){
      const standing = await  this.standing(leagueId)
      const standings = standing.map(st => st.teamId);
      const standingHome = await this.sheduleMatchService.getStandingHomeAway(standingQuery,standings, leagueId);
      const scoreMap = new Map();
      this.loopStanding(standingHome,scoreMap);
      const resultStandingArray = Array.from(scoreMap.entries()).map(([teamId, totalScore]) => ({
        teamId,
        score: totalScore,
      }));
      const standingHomeAway = await this.standing(leagueId)
      const standingall = await this.standing(leagueId)
      const resultHomeOrAway = new Map();
      standingHomeAway.forEach((item) => {
        resultHomeOrAway.set(item.teamId, item);
      });
    this.mergedArray(resultStandingArray,resultHomeOrAway);
    const standingHomeOrAway = { standing: [...resultHomeOrAway.values()] };
    let StandingQuery = standingQuery
    const getLastFiveMatch = await this.getLastFiveMatch( StandingQuery , leagueId) 
    if(standingQuery === HomeAwayEnum.All){
      return this.addLastFiveToStandingAll({standingall,getLastFiveMatch})
    }else if(standingQuery === HomeAwayEnum.Home){
      return await this.addLastFivesToStanding(standingHomeOrAway,getLastFiveMatch) 
       }
      else if(standingQuery === HomeAwayEnum.Away)
      return await this.addLastFivesToStanding(standingHomeOrAway,getLastFiveMatch) 
    }
   
}