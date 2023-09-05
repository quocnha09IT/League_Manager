import { UploadedFile } from "@nestjs/common";
import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsString } from "class-validator";
import { User } from "src/modules/user/entities/user.entity";

export class CreateTeamDto {
    id?:number
    nameTeam?:string;
    logoTeam?: string;
    createdBy:User;
    leagueId: number;
}
