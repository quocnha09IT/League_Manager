import { Body, Controller, Post } from "@nestjs/common";
import { ApiBearerAuth, ApiOperation, ApiTags } from "@nestjs/swagger";
import { UserInfoMatchService } from "../../User_InfoMatch.service";

import { UserInfoMatchDto } from "../../dto/User_InfoMatch.dto";
import { Roles, User } from 'src/decorator/roles.decorator';
import { Role } from "src/common/role.enum";

@Controller('UserInfomatch')
@ApiTags('User Infomation Match')
export class UserInfoMatchController{
    constructor(private userInfoMatchService: UserInfoMatchService){}

    @ApiOperation({summary: 'User Share infomation match'})
    @Post()
    @Roles(Role.MANAGE_LEAGUE,Role.USER)
    @ApiBearerAuth('Bearer')
    async auserInfoMatch(@User() UserId,@Body()infoMatch:UserInfoMatchDto){
        return this.userInfoMatchService.auserInfoMatch(UserId,infoMatch)
    }
}