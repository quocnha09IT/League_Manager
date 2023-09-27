import { Role } from "src/common/enum/role.enum";
import { User } from "src/modules/user/entities/user.entity";
import { Player } from "src/modules/player/entities/player.entity";
import { Column, CreateDateColumn, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { SheduleMatch } from "src/modules/shedule-match/entities/shedule-match.entity";
import { League } from "src/modules/league/entities/league.entity";
import { StandingEntity } from "src/modules/standing/entities/standing.entity";
import { LeagueTeam } from "src/modules/league-team/entitis/league-team.entity";

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

    // @OneToMany(()=> LeagueTeam, leagueteam => leagueteam.team)
    // public leagueteam: LeagueTeam[]

    @ManyToMany(()=> League, (league) => league.teams)
    leagues: League[]

    // S
     
}
