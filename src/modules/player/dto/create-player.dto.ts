import { ApiProperty } from "@nestjs/swagger";

export class CreatePlayerDto {
    @ApiProperty()
    id?: number;

    @ApiProperty()
    playerName?:string;

    @ApiProperty()
    age?:number;

    @ApiProperty()
    clothesNumber?:number;

    @ApiProperty()
    nationnality?:string;

    @ApiProperty()
    playForTeam?:string;

    @ApiProperty()
    position?: string;

    @ApiProperty()
    height?:number;

    @ApiProperty()
    weight?: number;

    @ApiProperty()
    teamId?:number;
}
