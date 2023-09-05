import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { UserInfoMatch } from "./entities/User_InfoMatch.entity";
import { UserInfoMatchRepository } from "./repository/User_InfoMatch.repository";
import { User } from "../user/entities/user.entity";
import { UserInfoMatchDto } from "./dto/User_InfoMatch.dto";
import { assign } from "nodemailer/lib/shared";

@Injectable()
export class UserInfoMatchService{
    constructor(@InjectRepository(UserInfoMatch)
                private userInfoMatchRepository: UserInfoMatchRepository
    ){}

    async auserInfoMatch(UserId:User,infoMatchDto:UserInfoMatchDto){
        const infoMatch  = new UserInfoMatch()
        infoMatch.UserId = UserId;
        infoMatch.IdInfoMatch = infoMatchDto.IdInfoMatch;
        infoMatch.action = infoMatchDto.action;
        console.log(infoMatch)
        //  return await this.userInfoMatchRepository.save(addInfoMatch)
    }
    
}