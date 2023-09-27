import { Module, forwardRef } from '@nestjs/common';
import { LeagueService } from './league.service';
import { LeagueController } from './http/controller/league.controller';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { League } from './entities/league.entity';
import { SheduleMatch } from '../shedule-match/entities/shedule-match.entity';
import { SheduleMatchModule } from '../shedule-match/shedule-match.module';

@Module({
  imports:[ConfigModule,
    
    TypeOrmModule.forFeature([League]),
],
  controllers: [LeagueController],
  providers: [LeagueService],
  exports: [LeagueService]
})
export class LeagueModule {}
