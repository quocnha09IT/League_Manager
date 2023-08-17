import { User } from "src/modules/user/entities/user.entity";

export class CreateTeamDto {
    nameTeam:string;
    logoTeam:string;
    createdBy:User;
}
