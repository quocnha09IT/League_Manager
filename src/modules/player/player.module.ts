import { Module } from '@nestjs/common';
import { PlayerService } from './player.service';
import { PlayerController } from './player.controller';
import { Player } from './entities/player.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { Team } from '../team/entities/team.entity';

@Module({
  imports:[ConfigModule,
    TypeOrmModule.forFeature([Player,Team]),
],
  controllers: [PlayerController],
  providers: [PlayerService],
})
export class PlayerModule {}
