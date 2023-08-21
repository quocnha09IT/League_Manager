import { User } from "src/modules/user/entities/user.entity";

export class CreateLeagueDto {
    nameLeague?:string;
    sport?:string;
    area?:string;
    level?:string;
    createdBy?:User;

}
