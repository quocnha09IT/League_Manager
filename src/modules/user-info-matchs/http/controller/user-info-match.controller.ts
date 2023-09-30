import { Body, Controller, Delete, Post, Put, Query } from "@nestjs/common";
import { ApiBearerAuth, ApiOperation, ApiTags } from "@nestjs/swagger";
import { UserInfoMatchService } from "../../user-info-match.service";

import { UserInfoMatchDto } from "../../dto/user-info-match.dto";
import { Roles, User } from 'src/decorator/roles.decorator';
import { Role } from "src/common/enum/role.enum";

@Controller('user-info-matchs')
@ApiTags('User Infomation Match')
export class UserInfoMatchController{
    constructor(private userInfoMatchService: UserInfoMatchService){}

    @ApiOperation({summary: 'User Share infomation match'})
    @Post()
    @Roles(Role.MANAGE_LEAGUE,Role.USER)
    @ApiBearerAuth('Bearer')
    async addUserInfoMatch(@User() UserId,@Body()infoMatch:UserInfoMatchDto){
        return this.userInfoMatchService.addUserInfoMatch(UserId,infoMatch)
    }


    @ApiOperation({summary: 'User Share infomation match'})
    @Delete()
    @Roles(Role.MANAGE_LEAGUE,Role.USER)
    @ApiBearerAuth('Bearer')
    async deleteUserInfoMatch(@Query('id')id : number){
        return this.userInfoMatchService.deleteUserInfoMatch(id)
    }


    @ApiOperation({summary: 'User Share infomation match'})
    @Put()
    @Roles(Role.MANAGE_LEAGUE,Role.USER)
    @ApiBearerAuth('Bearer')
    async updateUserInfoMatch(@Query('id')id : number,userInfoMatchDto: UserInfoMatchDto ){
        return this.userInfoMatchService.updateUserInfoMatch(id,userInfoMatchDto)
    }
}