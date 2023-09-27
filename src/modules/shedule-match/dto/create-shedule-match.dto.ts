import { ApiProperty } from "@nestjs/swagger";
import { Timestamp } from "typeorm";

export class CreateSheduleMatchDto {

    id?: number;
    @ApiProperty()
    date?: Date;
    @ApiProperty()
    time?: string;
    @ApiProperty()
    matchvenue?: string;
    @ApiProperty()
    goalHome?:number;
    @ApiProperty()
    isProcessed?: boolean;
    @ApiProperty()
    goalAway?:number;
    @ApiProperty()
    homeTeamId?:number;
    @ApiProperty()
    awayTeamId?:number;
    @ApiProperty()
    matchPlayed?:number;
    timestamp?:Timestamp;
}
