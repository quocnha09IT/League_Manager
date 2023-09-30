import { MiddlewareConsumer, Module, NestModule, ValidationPipe } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './modules/users/user.module';
import { SheduleMatchModule } from './modules/shedule-matchs/shedule-match.module';
import { PlayerModule } from './modules/players/player.module';
import { LeagueModule } from './modules/leagues/league.module';
import { SportModule } from './modules/sports/sport.module';
import { TeamModule } from './modules/teams/team.module';
import { TypeOrmModule } from '@nestjs/typeorm';

import { League } from './modules/leagues/entities/league.entity';

import { Player } from './modules/players/entities/player.entity';
import { SheduleMatch } from './modules/shedule-matchs/entities/shedule-match.entity';
import { Sport } from './modules/sports/entities/sport.entity';
import { Team } from './modules/teams/entities/team.entity';
import { User } from './modules/users/entities/user.entity';
import { AuthModule } from './auth/auth.module';
import { dataSourceoptions } from 'db/data-source';
import { AuthSwaggerMiddleware } from './auth/auth-swager.middleware';
import { CommentModule } from './modules/comments/comment.module';
import { APP_PIPE } from '@nestjs/core';
import { StandingModule } from './modules/standings/standing.module';
import { LeagueTeamModule } from './modules/league-teams/league-team.module';
import { MailerModule } from '@nestjs-modules/mailer';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { join } from 'path';
import { UserService } from './modules/users/user.service';
import { SheduleMatchService } from './modules/shedule-matchs/shedule-match.service';
import { TeamService } from './modules/teams/team.service';
import { StandingService } from './modules/standings/standing.service';
import { LeagueService } from './modules/leagues/league.service';
import { StandingEntity } from './modules/standings/entities/standing.entity';
import { InfoMatchModule } from './modules/info-matchs/repository/info-match.module';
import { MulterModule } from '@nestjs/platform-express';
import { UserInfoMatchModule } from './modules/user-info-matchs/user-info-match.module';
import { PlayerService } from './modules/players/player.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `.env`,
    }),
    MailerModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (config: ConfigService)=> ({
        transport: {
          service: 'gmail',
          port: 465,
          host: "smtp.gmail.com",
          secure: true,
          auth:{
            user: 'quocnha09@gmail.com',
            pass: 'e icknwuxv d ey rdyg',
          },
        },
        defaults: {
          from: `"No repply to quocnha09@gmail.com"`
        },
        template:{
          dir: join(__dirname,'src/templates/email'),
          options:{
            strict: true,
          },
        },
      }),
      inject: [ ConfigService]
       
    
    }),
    TypeOrmModule.forRoot(dataSourceoptions),
    TypeOrmModule.forFeature([
      SheduleMatch,User,Team,League,StandingEntity,Player]),
    AuthModule,UserModule, SheduleMatchModule, PlayerModule, LeagueModule, SportModule, 
    TeamModule, AuthModule,CommentModule,StandingModule,LeagueTeamModule,InfoMatchModule,UserInfoMatchModule,
      ],
  controllers: [AppController],
  providers: [AppService,
              UserService,
              TeamService,
              StandingService,
              LeagueService,
              PlayerService,
              
              
         {
      provide: APP_PIPE,
      useClass: ValidationPipe,
    }
            ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthSwaggerMiddleware)
      .forRoutes('league'); 
  }
}
