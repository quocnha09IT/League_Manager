import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './modules/user/user.module';
import { SheduleMatchModule } from './modules/shedule-match/shedule-match.module';
import { PlayerModule } from './modules/player/player.module';
import { LeagueModule } from './modules/league/league.module';
import { SportModule } from './modules/sport/sport.module';
import { TeamModule } from './modules/team/team.module';
import { TypeOrmModule } from '@nestjs/typeorm';

import { League } from './modules/league/entities/league.entity';

import { Player } from './modules/player/entities/player.entity';
import { SheduleMatch } from './modules/shedule-match/entities/shedule-match.entity';
import { Sport } from './modules/sport/entities/sport.entity';
import { Team } from './modules/team/entities/team.entity';
import { User } from './modules/user/entities/user.entity';
import { AuthModule } from './auth/auth.module';
import { dataSourceoptions } from 'db/data-source';
import { AuthSwaggerMiddleware } from './auth/authSwager.middleware';

@Module({
  imports: [
    TypeOrmModule.forRoot(dataSourceoptions),
    TypeOrmModule.forFeature([SheduleMatch]),
    AuthModule,UserModule, SheduleMatchModule, PlayerModule, LeagueModule, SportModule, TeamModule, AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthSwaggerMiddleware)
      .forRoutes('league'); 
  }
}
