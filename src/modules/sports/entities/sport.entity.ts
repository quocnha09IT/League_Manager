import { League } from "src/modules/leagues/entities/league.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Sport {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    nameSport: string

    @Column()
    rules: string

    @Column()
    numberPlayer: number

    @ManyToOne(() => League, (league) => league.sports)
    league: League

}
