import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class EnterGoalDto{
    @IsNotEmpty()
    @ApiProperty({description :'Enter goal home team'})
    goalHome?:number;

    @IsNotEmpty()
    @ApiProperty({description :'Enter goal away team'})
    goalAway?:number;
}