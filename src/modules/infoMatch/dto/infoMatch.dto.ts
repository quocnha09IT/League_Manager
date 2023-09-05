import { ApiProperty } from "@nestjs/swagger"
import { User } from "src/modules/user/entities/user.entity"

export class InfoMatchDto{
    id?: number
    @ApiProperty()
    matchId?: number
    @ApiProperty()
    infoMatch?: string
    @ApiProperty()
    timeMatch?: string
}