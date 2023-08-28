import { IsEmail, IsNotEmpty, MinLength } from "class-validator";

export class CreateCommentDto{
    id?: number;

    @IsNotEmpty()
    comment?: string;

    userId?: number;

    sheduleMatchId?:number
}