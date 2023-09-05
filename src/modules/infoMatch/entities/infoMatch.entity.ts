import { SheduleMatch } from "src/modules/shedule-match/entities/shedule-match.entity";
import { User } from "src/modules/user/entities/user.entity";
import { Column, Entity, JoinTable, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity('InfoMatch')
export class InfoMatch{
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    matchId: number

    @Column()
    infoMatch: string

    @Column()
    timeMatch: string

    // @OneToMany(()=> SheduleMatch, sheduleMatch => sheduleMatch.matchId)
    // sheduleMatch: SheduleMatch[]

    @ManyToMany(() => User ,(user) => user.infoMatchs)
    @JoinTable({
        name: 'User_InfoMatch',
        joinColumn: {
            name: 'IdInfoMatch',
            referencedColumnName: 'id'
        },
        inverseJoinColumn:{
            name: 'UserId',
            referencedColumnName: 'id'
        }
    })
    users : User[]
}