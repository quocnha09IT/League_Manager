import { Module } from '@nestjs/common';
import { TeamService } from './team.service';
import { TeamController } from './team.controller';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Team } from './entities/team.entity';

@Module({
  controllers: [TeamController],
  providers: [TeamService],
  imports:[ConfigModule,
    TypeOrmModule.forFeature([Team]),
],
})
export class TeamModule {}
