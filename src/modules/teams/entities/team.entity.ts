import { Role } from "src/common/enum/role.enum";
import { User } from "src/modules/users/entities/user.entity";
import { Player } from "src/modules/players/entities/player.entity";
import { Column, CreateDateColumn, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { SheduleMatch } from "src/modules/shedule-matchs/entities/shedule-match.entity";
import { League } from "src/modules/leagues/entities/league.entity";
import { StandingEntity } from "src/modules/standings/entities/standing.entity";

@Entity('team')
export class Team {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    nameteam: String

    @Column({nullable:true})
    logoTeam: String    
   
    @OneToMany(() => SheduleMatch,sheduleMatch => sheduleMatch.homeTeamId)
    homeTeams: SheduleMatch[]

    @OneToMany(() => SheduleMatch,sheduleMatch => sheduleMatch.awayTeam)
    awayTeams: SheduleMatch[]

    @ManyToOne(() => User, user => user.team)
    createdBy: User;

    @OneToMany(() => Player, player => player.team)
    players: Player[];

    @OneToMany(() => StandingEntity, standing => standing.team)
    standings: StandingEntity[];

    @ManyToMany(()=> League, (league) => league.teams)
    leagues: League[]
     
}
