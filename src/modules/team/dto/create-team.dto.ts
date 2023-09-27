import { UploadedFile } from "@nestjs/common";
import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsString } from "class-validator";
import { User } from "src/modules/user/entities/user.entity";

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

export class UploadedFileDto{
    @ApiProperty({ type: 'string', format: 'binary', required: true })
    logoTeam: Express.Multer.File
}
