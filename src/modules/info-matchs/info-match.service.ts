import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { InfoMatch } from "./entities/info-match.entity";
import { InfoMatchRepository } from "./repository/info-match.repository";
import { InfoMatchDto } from "./dto/info-match.dto";
import { User } from "src/modules/users/entities/user.entity";
import { UserInfoMatchService } from "src/modules/user-info-matchs/user-info-match.service";

@Injectable()
export class InfoMatchService{
    constructor(@InjectRepository(InfoMatch)
                private infoMatchRepositoy : InfoMatchRepository,
             
    ){}

    async addInfoMatch(infoMatchDto: InfoMatchDto){
        return await this.infoMatchRepositoy.save(infoMatchDto)
    }


    async deleteInfoMatch(id: number){
        return await this.infoMatchRepositoy.delete(id)
    }

    async updateInfoMatch(id:number,infoMatchDto: InfoMatchDto){
        return this.infoMatchRepositoy.update(id,infoMatchDto)
    }

}