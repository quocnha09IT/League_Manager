import { Module, forwardRef } from '@nestjs/common';
import { PlayerService } from './player.service';
import { PlayerController } from './http/controller/player.controller';
import { Player } from './entities/player.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { Team } from '../team/entities/team.entity';
import { TeamService } from '../team/team.service';
import { TeamModule } from '../team/team.module';

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
