
import { InfoMatch } from "src/modules/info-match/entities/info-match.entity";
import { UserComment } from "src/modules/comment/entities/comment.entity";
import { League } from "src/modules/league/entities/league.entity";
import { StandingEntity } from "src/modules/standing/entities/standing.entity";
import { Team } from "src/modules/team/entities/team.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn, Timestamp } from "typeorm";
import { DateMatchTransformer } from "../transformers/date-match.transformer";

@Entity()
export class SheduleMatch {
   
    @PrimaryGeneratedColumn()
    id: number

    @Column({
        type: 'timestamp',
        transformer: new DateMatchTransformer(),
      })
    date: Date

    @Column({type: 'time'})
    time: string

    @Column()
    matchvenue: string

    @Column({default: null})
    goalHome:number

    @Column({default: null})
    isProcessed : boolean
    
    @Column({default: null})
    goalAway:number 

    @Column()
    homeTeamId :number

    @Column()
    awayTeamId: number

    @Column()
    leagueId: number

    @Column({ type: "timestamp" })
    timeMatch: Timestamp
    

    @ManyToOne(() => Team, (team) => team.homeTeams)
    homeTeam: Team;

    @ManyToOne(() => Team , team => team.awayTeams)
    awayTeam: Team

    @ManyToOne(()=> League,(league)=> league.sheduleMatchs)
    league: League

    @OneToMany(()=> UserComment, userComment => userComment.sheduleMatch)
    userComment: UserComment[]

    @OneToOne(() => StandingEntity)
    standing: StandingEntity
    
    

}
