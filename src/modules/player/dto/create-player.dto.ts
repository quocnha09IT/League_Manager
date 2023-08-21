import { ApiProperty } from "@nestjs/swagger";

export class CreatePlayerDto {
    id?: number;
    playerName?:string;
    age?:number;
    clothesNumber?:number;
    nationnality?:string;
    playForTeam?:string;
    position?: string;
    height?:number;
    weight?: number;
    teamId?:number;
}
