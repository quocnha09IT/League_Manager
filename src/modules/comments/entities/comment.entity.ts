import { SheduleMatch } from "src/modules/shedule-matchs/entities/shedule-match.entity";
import { Column, Entity, ManyToMany, ManyToOne, PrimaryColumn } from "typeorm";

@Entity({ name: 'UserComment' })
export class UserComment {
    @PrimaryColumn()
    id: number

    @Column()
    comment: string

    @Column()
    userId: number

    @Column()
    sheduleMatchId: number

    @ManyToOne(() => SheduleMatch,( sheduleMatch) => sheduleMatch.userComment)
    sheduleMatch: SheduleMatch
}