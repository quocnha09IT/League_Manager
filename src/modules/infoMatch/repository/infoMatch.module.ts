import { Module } from "@nestjs/common";
import { InfoMatchController } from "../http/controller/infoMatch.controller";
import { InfoMatchService } from "../infoMatch.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { InfoMatch } from "../entities/infoMatch.entity";

@Module({
    imports:[TypeOrmModule.forFeature([InfoMatch])],
    controllers: [InfoMatchController],
    providers: [InfoMatchService]
})export class InfoMatchModule{}