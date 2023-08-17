
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
    goalAway:number 

    @ManyToOne(() => Team, team => team.homeTeams)
    homeTeam: Team;

    @ManyToOne(() => Team , team => team.awayTeams)
    awayTeam: Team
    
   

}
