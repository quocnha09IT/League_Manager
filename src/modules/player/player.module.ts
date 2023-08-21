import { Module } from '@nestjs/common';
import { PlayerService } from './player.service';
import { PlayerController } from './http/controller/player.controller';
import { Player } from './entities/player.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { Team } from '../team/entities/team.entity';
import { TeamService } from '../team/team.service';

@Module({
  imports:[ConfigModule,
    TypeOrmModule.forFeature([Player,Team]),
],
  controllers: [PlayerController],
  providers: [PlayerService,TeamService],
})
export class PlayerModule {}
