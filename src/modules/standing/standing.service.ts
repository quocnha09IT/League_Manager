import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { StandingEntity } from "./entities/standing.entity";
import { StandingRepository } from "./repository/standing.repository";

@Injectable()
export class StandingService {
    constructor(@InjectRepository(StandingEntity)
                private standingRepository: StandingRepository,
    ){}


    async findTeam(id: number){
        const count =  await this.standingRepository.findOne({where:{teamId: id}})
        return count
    }

    async Getstanding(){
        return await this.standingRepository.find()
    }

    async findTeamLeagueId(id: number){
        const count =  await this.standingRepository.findOne({where:{teamId: id}})
        if(count == null){
            return count 
        } else { 
            return count.leagueId
        }
        
    }

    async saveScore(goalAway : number,goalHome : number, matchPlayer : number,score : number, teamId : number,leagueId : number){
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


    async standing(leagueid : number){
        return await this.standingRepository.find({
            where: { leagueId: leagueid },
            relations: { team: true },
            order: {
                score: 'ASC',
              }
          })

    }
}