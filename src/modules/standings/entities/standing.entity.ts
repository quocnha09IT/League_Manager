import { SheduleMatch } from "src/modules/shedule-matchs/entities/shedule-match.entity";
import { Team } from "src/modules/teams/entities/team.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";
import { OneToMany } from "typeorm";

@Entity('standing')
export class StandingEntity  {
    
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    leagueId: number

    @Column()
    score: number

    @Column()
    numberGoal: number

    @Column()
    concededGoal: number

    @Column()
    matchPlayer: number

    @Column()
    teamId: number

    @ManyToOne(() => Team, team => team.standings)
    team: Team;
    last5Match: any[];
}