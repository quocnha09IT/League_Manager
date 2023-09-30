import { ApiProperty } from "@nestjs/swagger";
import { IsDate } from "class-validator";
import { Timestamp } from "typeorm";

export class CreateSheduleMatchDto {
    @IsDate()
    @ApiProperty()
    date?: Date;

    @ApiProperty()
    time?: string;

    @ApiProperty()
    matchvenue?: string;

    @ApiProperty()
    homeTeamId?:number;
    
    @ApiProperty()
    awayTeamId?:number;
}
