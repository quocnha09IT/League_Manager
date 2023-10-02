import { ApiProperty } from "@nestjs/swagger";
import { IsNumber } from "class-validator";

export class LeageTeamDto{
    id?: number;

    @ApiProperty()
    @IsNumber()
    leagueId?: number;

    @ApiProperty()
    @IsNumber()
    teamId?: number;
}