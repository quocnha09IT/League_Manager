
import { SheduleMatch } from "src/modules/shedule-matchs/entities/shedule-match.entity";
import { Sport } from "src/modules/sports/entities/sport.entity";
import { Team } from "src/modules/teams/entities/team.entity";
import { User } from "src/modules/users/entities/user.entity";
import { Column, Entity, JoinTable, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity('league')
export class League {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    nameleague: string

    @Column()
    sport: string

    @Column()
    area: string

    @Column()
    level: string 
    
    @OneToMany(() => Sport, (sport) => sport.league)
    sports: Sport[]

    @ManyToOne(() => User , user => user.league)
    createdBy: User;

    @OneToMany(()=> SheduleMatch,sheduleMatch => sheduleMatch.league)
    sheduleMatchs: SheduleMatch[]

    @ManyToMany(() => Team ,(team) => team.leagues)
    @JoinTable({
        name: 'league_team',
        joinColumn: {
            name: 'leagueId',
            referencedColumnName: 'id'
        },
        inverseJoinColumn:{
            name: 'teamId',
            referencedColumnName: 'id'
        }
    })
    teams : Team[]

    

    
}
