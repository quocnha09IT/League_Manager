import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsString } from "class-validator";
import { User } from "src/modules/users/entities/user.entity";
import { UploadedFile } from '@nestjs/common';
export class CreateTeamDto {
    id?:number
    @ApiProperty()
    nameteam?:string;


    @ApiProperty({ type: 'string', format: 'binary', required: true })
    logoTeam: Express.Multer.File

    @ApiProperty()
    createdBy:User;

    @ApiProperty()
    leagueId: number;
}
