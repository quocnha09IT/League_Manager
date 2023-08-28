
import { UserComment } from "src/modules/comment/entities/comment.entity";
import { League } from "src/modules/league/entities/league.entity";
import { Team } from "src/modules/team/entities/team.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class SheduleMatch {
   
    @PrimaryGeneratedColumn()
    id: number

    @Column({ type: 'date' })
    date: Date

    @Column({type: 'time'})
    time: string

    @Column()
    matchVenue: string

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

    @ManyToOne(() => Team, (team) => team.homeTeams)
    homeTeam: Team;

    // @ManyToOne(() => Team , team => team.awayTeams)
    // awayTeam: Team

    @ManyToOne(()=> League,(league)=> league.sheduleMatchs)
    league: League

    @OneToMany(()=> UserComment, userComment => userComment.sheduleMatch)
    userComment: UserComment[]
    
    

}
