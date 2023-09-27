import { Body, Controller, Delete, Param, Post, Put, Query } from "@nestjs/common";
import { ApiOperation, ApiTags } from "@nestjs/swagger";
import { InfoMatchDto } from "src/modules/info-match/dto/info-match.dto";
import { InfoMatchService } from "src/modules/info-match/info-match.service";
import { User } from "src/modules/user/entities/user.entity";

@Controller('info-match')
@ApiTags('Infomation For Match')
export class InfoMatchController {
    constructor(private infoMatchService: InfoMatchService,
                ){}



    @Post()
    @ApiOperation({summary:'insert infomation for match'})
    async addInfoMatch(@Body()infoMatchDto: InfoMatchDto){
        return await this.infoMatchService.addInfoMatch(infoMatchDto)
    }


    @Delete()
    @ApiOperation({summary:'delete infomation for match'})
    async deleteInfoMatch(@Query('id')id: number){
        return await this.infoMatchService.deleteInfoMatch(id)
    }


    @Put()
    @ApiOperation({summary:'update infomation for match'})
    async updateInfoMatch(@Query('id')id : number,@Body()infoMatchDto: InfoMatchDto){
        return await this.infoMatchService.updateInfoMatch(id,infoMatchDto)
    }

}