import { ApiProperty } from "@nestjs/swagger"
import { User } from "src/modules/user/entities/user.entity"

export class UserInfoMatchDto{  
    @ApiProperty()
    id?: number
    @ApiProperty()
    action?: string
    @ApiProperty()
    IdInfoMatch?: string
    UserId?: User
}