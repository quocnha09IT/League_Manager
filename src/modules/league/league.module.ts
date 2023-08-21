import { Module } from '@nestjs/common';
import { LeagueService } from './league.service';
import { LeagueController } from './http/controller/league.controller';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { League } from './entities/league.entity';

@Module({
  imports:[ConfigModule,
    TypeOrmModule.forFeature([League]),
],
  controllers: [LeagueController],
  providers: [LeagueService],
})
export class LeagueModule {}
