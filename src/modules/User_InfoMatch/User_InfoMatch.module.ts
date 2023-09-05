import { Module } from "@nestjs/common";
import { UserInfoMatchService } from "./User_InfoMatch.service";
import { UserInfoMatchController } from "./http/controller/User_InfoMatch.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserInfoMatch } from "./entities/User_InfoMatch.entity";
import { ConfigService } from "@nestjs/config";

@Module({
    imports:[TypeOrmModule.forFeature([UserInfoMatch])],
    providers:[UserInfoMatchService,ConfigService],
    controllers:[UserInfoMatchController]
})export class UserInfoMatchModule{}