import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { InfoMatch } from "./entities/infoMatch.entity";
import { InfoMatchRepository } from "./repository/infoMatch.repository";
import { InfoMatchDto } from "./dto/infoMatch.dto";
import { User } from "src/modules/user/entities/user.entity";
import { UserInfoMatchService } from "src/modules/User_InfoMatch/User_InfoMatch.service";

@Injectable()
export class InfoMatchService{
    constructor(@InjectRepository(InfoMatch)
                private infoMatchRepositoy : InfoMatchRepository,
             
    ){}

    async addInfoMatch(infoMatchDto: InfoMatchDto){
        return await this.infoMatchRepositoy.save(infoMatchDto)
    }
    // async ShareInfoMAtch(userId: User,infoMatchDto: InfoMatchDto){
        
    //     return await  this.userInfoMatchService(userId,infoMatchDto)
    // }

}