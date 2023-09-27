import { ApiProperty } from "@nestjs/swagger";
import { User } from "src/modules/user/entities/user.entity";
export class CreateLeagueDto {
    @ApiProperty()
    nameleague?:string;

    @ApiProperty()
    sport?:string;

    @ApiProperty()
    area?:string;

    @ApiProperty()
    level?:string;

    
    createdBy?:User;
    teamId:any[];

}
