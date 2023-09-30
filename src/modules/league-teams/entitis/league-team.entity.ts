
import { Column, Entity, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity('league_team')
export class LeagueTeam{
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    leagueId : number

    @Column()
    teamId : number

}