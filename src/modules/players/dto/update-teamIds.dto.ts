import { ApiProperty } from "@nestjs/swagger";

export class UpdateTeamIdsDto{
    @ApiProperty()
    teamId?:number
}