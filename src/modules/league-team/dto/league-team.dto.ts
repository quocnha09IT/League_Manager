import { ApiProperty } from "@nestjs/swagger";

export class LeageTeamDto{

    id?: number;
    @ApiProperty()
    leagueId?: number;
    @ApiProperty()
    teamId?: number;
}