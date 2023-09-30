import { ApiProperty } from "@nestjs/swagger";
import { IsString, Length, Max, Min } from "class-validator";

export class CreatePlayerDto {

    @ApiProperty()
    @IsString()
    @Length(2, 50, { message: 'Player name must be between 2 and 50 characters.' })
    playerName?:string;

    @ApiProperty()
    age?:number;

    @ApiProperty()
    @Length(1, 99, { message: 'Clothes number must be at least 1.' })
    clothesNumber?:number;

    @ApiProperty()
    nationnality?:string;

    @ApiProperty()
    playForTeam?:string;

    @ApiProperty()
    position?: string;

    @ApiProperty()
    @Min(100, { message: 'Height must be at least 100 cm.' })
    @Max(250, { message: 'Height cannot be more than 250 cm.' })
    height?:number;

    @ApiProperty()
    weight?: number;
}
