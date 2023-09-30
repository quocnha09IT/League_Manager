import { info } from "console";
import { Role } from "src/common/enum/role.enum";
import { InfoMatch } from "src/modules/info-matchs/entities/info-match.entity";
import { UserInfoMatch } from "src/modules/user-info-matchs/entities/user-info-match.entity";
import { League } from "src/modules/leagues/entities/league.entity";
import { Player } from "src/modules/players/entities/player.entity";
import { Team } from "src/modules/teams/entities/team.entity";
import { Column, Entity, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { LowerTransformer } from "src/core/transformers/lower.transformer";

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: string

    @Column({ transformer: new LowerTransformer() })
    email: string

    @Column({ select: false, nullable: true })
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

    @ManyToMany(() => InfoMatch,(infoMatch) => infoMatch.users)
    infoMatchs: InfoMatch

    @OneToMany(() => UserInfoMatch, userInfoMatch => userInfoMatch.UserId)
    userInfoMatch: UserInfoMatch[]
    
}
