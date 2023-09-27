import { Module } from "@nestjs/common";
import { InfoMatchController } from "../http/controller/info-match.controller";
import { InfoMatchService } from "../info-match.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { InfoMatch } from "../entities/info-match.entity";

@Module({
    imports:[TypeOrmModule.forFeature([InfoMatch])],
    controllers: [InfoMatchController],
    providers: [InfoMatchService]
})export class InfoMatchModule{}