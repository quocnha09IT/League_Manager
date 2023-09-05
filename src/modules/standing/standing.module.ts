import { Module } from "@nestjs/common";
import { StandingService } from "./standing.service";
import { ConfigModule } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";
import { StandingEntity } from "./entities/standing.entity";
import { StandingController } from "./http/controller/standing.controller";

@Module({
  controllers: [StandingController],
  providers: [StandingService],
  imports:[ConfigModule,
    TypeOrmModule.forFeature([StandingEntity]),
],
}) 
export class StandingModule{}