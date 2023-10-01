import { Body, Controller, Delete, HttpCode, HttpStatus, Param, Post, Put, Query } from "@nestjs/common";
import { ApiOperation, ApiTags } from "@nestjs/swagger";
import { InfoMatchDto } from "src/modules/info-matchs/dto/info-match.dto";
import { InfoMatchService } from "src/modules/info-matchs/info-match.service";

@Controller('info-matchs')
@ApiTags('Infomation For Match')
export class InfoMatchController {
    constructor(private infoMatchService: InfoMatchService,
                ){}



    @Post()
    @HttpCode(HttpStatus.CREATED)
    @ApiOperation({summary:'insert infomation for match'})
    async addInfoMatch(@Body()infoMatchDto: InfoMatchDto){
        return await this.infoMatchService.addInfoMatch(infoMatchDto)
    }


    @Delete()
    @HttpCode(HttpStatus.NO_CONTENT)
    @ApiOperation({summary:'delete infomation for match'})
    async deleteInfoMatch(@Query('id')id: number){
        return await this.infoMatchService.deleteInfoMatch(id)
    }


    @Put()
    @HttpCode(HttpStatus.NO_CONTENT)
    @ApiOperation({summary:'update infomation for match'})
    async updateInfoMatch(@Query('id')id : number,@Body()infoMatchDto: InfoMatchDto){
        return await this.infoMatchService.updateInfoMatch(id,infoMatchDto)
    }

}