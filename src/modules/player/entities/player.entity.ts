
import { Role } from "src/common/enum/role.enum";
import { Team } from "src/modules/team/entities/team.entity";
import { User } from "src/modules/user/entities/user.entity";
import { Column, Entity, Index, JoinColumn, JoinTable, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Player {
    @PrimaryGeneratedColumn()
    id: number

    @Index({ fulltext: true })
    @Column()
    playername:string

    @Column()
    age:number

    @Column()
    clothesNumber:number

    @Index({ fulltext: true })
    @Column()
    nationnality:string

    @Column()
    playForTeam:string

    @Index({ fulltext: true })
    @Column()
    position: string

    @Column()
    height:number

    @Column()
    weight: number

    @Column()
    numberGoal: number

    @ManyToOne(() =>User, (user) => user.players)
    user: User

    @ManyToOne(() => Team,team => team.players)
    @JoinColumn({ name: 'teamId' })
    team: Team;
    
}
