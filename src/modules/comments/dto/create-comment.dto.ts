import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, MinLength } from "class-validator";

export class CreateCommentDto{
    @ApiProperty()
    id?: number;

    @ApiProperty()
    @IsNotEmpty()
    comment?: string;

    @ApiProperty()
    userId?: number;

    @ApiProperty()
    sheduleMatchId?:number
}