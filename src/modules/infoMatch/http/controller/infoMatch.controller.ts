import { Body, Controller, Param, Post } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { InfoMatchDto } from "src/modules/infoMatch/dto/infoMatch.dto";
import { InfoMatchService } from "src/modules/infoMatch/infoMatch.service";
import { User } from "src/modules/user/entities/user.entity";

@Controller('InfoMatch')
@ApiTags('Infomation For Match')
export class InfoMatchController {
    constructor(private infoMatchService: InfoMatchService,
                ){}
    @Post()
    async addInfoMatch(@Body()infoMatchDto: InfoMatchDto){
        return await this.infoMatchService.addInfoMatch(infoMatchDto)
    }


    // @Post('share')
    // async ShareInfoMAtch(userId:User,@Body() infoMatchDto: InfoMatchDto){
    //     return await this.infoMatchService.ShareInfoMAtch(userId,infoMatchDto)
    // }
}