import { League } from "src/modules/leagues/entities/league.entity";
import { StandingEntity } from "src/modules/standings/entities/standing.entity";
import { Team } from "src/modules/teams/entities/team.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn, Timestamp } from "typeorm";
import { DateMatchValidator } from "../http/validators/date-match.validator";


@Entity()
export class SheduleMatch {
   
    @PrimaryGeneratedColumn()
    id: number

    @Column({
        type: 'timestamp',
        transformer: new DateMatchValidator(),
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

    @OneToOne(() => StandingEntity)
    standing: StandingEntity
    
    

}
