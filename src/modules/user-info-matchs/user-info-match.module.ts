import { Module } from "@nestjs/common";
import { UserInfoMatchService } from "./user-info-match.service";
import { UserInfoMatchController } from "./http/controller/user-info-match.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserInfoMatch } from "./entities/user-info-match.entity";
import { ConfigService } from "@nestjs/config";

@Module({
    imports:[TypeOrmModule.forFeature([UserInfoMatch])],
    providers:[UserInfoMatchService,ConfigService],
    controllers:[UserInfoMatchController]
})export class UserInfoMatchModule{}