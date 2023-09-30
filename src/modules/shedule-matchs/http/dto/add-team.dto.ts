import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class AddTeamDto {
    @IsNotEmpty()
    @ApiProperty({description :'Enter Id home team'})
    homeTeamId?:number;

    @IsNotEmpty()
    @ApiProperty({description :'Enter Id away team'})
    awayTeamId?:number;
}