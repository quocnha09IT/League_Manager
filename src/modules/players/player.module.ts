import { Module, forwardRef } from '@nestjs/common';
import { PlayerService } from './player.service';
import { PlayerController } from './http/controller/player.controller';
import { Player } from './entities/player.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { Team } from '../teams/entities/team.entity';
import { TeamService } from '../teams/team.service';
import { TeamModule } from '../teams/team.module';

@Module({
  imports:[ConfigModule,
    TypeOrmModule.forFeature([Player,Team]),
    forwardRef(()=> TeamModule)
],
  controllers: [PlayerController],
  providers: [PlayerService],
  exports:[PlayerService]
})
export class PlayerModule {}
