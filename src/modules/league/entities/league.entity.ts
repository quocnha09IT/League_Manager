
import { SheduleMatch } from "src/modules/shedule-match/entities/shedule-match.entity";
import { Sport } from "src/modules/sport/entities/sport.entity";
import { Team } from "src/modules/team/entities/team.entity";
import { User } from "src/modules/user/entities/user.entity";
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class League {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    nameLeague: string

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

    @OneToMany(() => Team, team => team.league)
    teams: Team[];

    @OneToMany(()=> SheduleMatch,sheduleMatch => sheduleMatch.league)
    sheduleMatchs: SheduleMatch[]

    

    
}
