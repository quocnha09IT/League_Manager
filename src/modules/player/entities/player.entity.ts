
import { Role } from "src/common/role.enum";
import { Team } from "src/modules/team/entities/team.entity";
import { User } from "src/modules/user/entities/user.entity";
import { Column, Entity, JoinColumn, JoinTable, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Player {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    playerName:string

    @Column()
    age:number

    @Column()
    clothesNumber:number

    @Column()
    nationnality:string

    @Column()
    playForTeam:string

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
