import { Module, forwardRef } from '@nestjs/common';
import { TeamService } from './team.service';

import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Team } from './entities/team.entity';
import { SheduleMatch } from '../shedule-match/entities/shedule-match.entity';
import { SheduleMatchService } from '../shedule-match/shedule-match.service';
import { PlayerModule } from '../player/player.module';
import { TeamController } from './http/controller/team.controller';

@Module({
  controllers: [TeamController],
  imports:[ConfigModule,
    TypeOrmModule.forFeature([Team]),
    forwardRef(() => PlayerModule),
   // forwardRef(() => FileModules),
],
  providers: [TeamService,ConfigService],
  exports:[TeamService]
 
})
export class TeamModule {}
