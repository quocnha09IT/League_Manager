import { Role } from "src/common/role.enum";
import { League } from "src/modules/league/entities/league.entity";
import { Player } from "src/modules/player/entities/player.entity";
import { Team } from "src/modules/team/entities/team.entity";
import { Column, Entity, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: string

    @Column()
    email: string

    @Column()
    password: string

    @Column()
    address: string 

    @Column()
    sex: boolean

    @Column({type: 'enum', enum: Role,default: Role.USER})
    public roles:string;

    @OneToMany(() => Player, (player) => player.user )
    players: Player[]

    @OneToMany(() => League, league => league.createdBy)
    league: League[]

    @OneToMany(() => Team, team => team.createdBy )
    team: Team
    
}
