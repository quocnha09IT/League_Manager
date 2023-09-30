import { ApiProperty } from "@nestjs/swagger";
import { IsString, Length } from "class-validator";
import { User } from "src/modules/users/entities/user.entity";
export class CreateLeagueDto {
    @ApiProperty()
    @IsString()
    @Length(2, 50, { message: 'Name must be between 2 and 50 characters.' })
    nameleague?:string;

    @ApiProperty()
    @IsString()
    sport?:string;

    @ApiProperty()
    @IsString()
    area?:string;

    @ApiProperty()
    @IsString()
    level?:string;
    
    teamId:any[];

}
