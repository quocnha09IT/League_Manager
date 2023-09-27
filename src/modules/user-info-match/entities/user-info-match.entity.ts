import { ApiProperty } from "@nestjs/swagger";
import { UUID } from "crypto";
import { User } from "src/modules/user/entities/user.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class UserInfoMatch{
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    action: string
    
    @Column()
    IdInfoMatch: string

    @ManyToOne(() => User , user => user.userInfoMatch)
    UserId: User;
}