import { Role } from "src/common/role.enum";
import { User } from "src/modules/user/entities/user.entity";
import { Player } from "src/modules/player/entities/player.entity";
import { Column, Entity, JoinColumn, ManyToMany, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { SheduleMatch } from "src/modules/shedule-match/entities/shedule-match.entity";
import { League } from "src/modules/league/entities/league.entity";

@Entity()
export class Team {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    nameTeam: String

    @Column()
    logoTeam: String    

    @Column({default: null})
    score: number

    @Column()
    numberGoal: number

    @Column()
    concededGoal: number

    @Column()
    goalPerformance: number

    @Column()
    leagueId: number

    @Column()
    matchPlayed: number

   

   
    @OneToMany(() => SheduleMatch,sheduleMatch => sheduleMatch.homeTeamId)
    homeTeams: SheduleMatch[]

    // @OneToMany(() => SheduleMatch,sheduleMatch => sheduleMatch.awayTeam)
    // awayTeams: SheduleMatch[]

    @ManyToOne(() => User, user => user.team)
    createdBy: User;

    @ManyToOne(() =>League, league=> league.teams)
    league: League;

    @OneToMany(() => Player, player => player.team)
    players: Player[];
     
}
