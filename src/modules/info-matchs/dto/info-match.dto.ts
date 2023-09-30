import { ApiProperty } from "@nestjs/swagger"

export class InfoMatchDto{
    id?: number
    @ApiProperty()
    matchId?: number
    @ApiProperty()
    infoMatch?: string
    @ApiProperty()
    timeMatch?: string
}