import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { UserInfoMatch } from "./entities/user-info-match.entity";
import { UserInfoMatchRepository } from "./repository/user-info-match.repository";
import { User } from "../user/entities/user.entity";
import { UserInfoMatchDto } from "./dto/user-info-match.dto";

@Injectable()
export class UserInfoMatchService{
    constructor(@InjectRepository(UserInfoMatch)
                private userInfoMatchRepository: UserInfoMatchRepository
    ){}

    async addUserInfoMatch(UserId:User,infoMatchDto:UserInfoMatchDto){
        const infoMatch  = new UserInfoMatch()
        infoMatch.UserId = UserId;
        infoMatch.IdInfoMatch = infoMatchDto.IdInfoMatch;
        infoMatch.action = infoMatchDto.action;
      return await this.userInfoMatchRepository.save(infoMatch)
    }


    async deleteUserInfoMatch(id: number){
      return await this.userInfoMatchRepository.delete(id);
    }


    async updateUserInfoMatch(id: number,userInfoMatchDto: UserInfoMatchDto){
      return await this.userInfoMatchRepository.update(id,userInfoMatchDto)
    }
    
}