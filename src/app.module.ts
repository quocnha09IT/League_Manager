import { MiddlewareConsumer, Module, NestModule, ValidationPipe } from '@nestjs/common';
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
import { CommentModule } from './modules/comment/comment.module';
import { APP_PIPE } from '@nestjs/core';
import { StandingModule } from './modules/standing/standing.module';
import { LeagueTeamModule } from './modules/league_team/league_team.module';
import { MailerModule } from '@nestjs-modules/mailer';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { join } from 'path';
import { UserService } from './modules/user/user.service';
import { SheduleMatchService } from './modules/shedule-match/shedule-match.service';
import { TeamService } from './modules/team/team.service';
import { StandingService } from './modules/standing/standing.service';
import { LeagueService } from './modules/league/league.service';
import { StandingEntity } from './modules/standing/entities/standing.entity';
import { InfoMatchModule } from './modules/infoMatch/repository/infoMatch.module';
import { MulterModule } from '@nestjs/platform-express';
import { UserInfoMatchModule } from './modules/User_InfoMatch/User_InfoMatch.module';

@Module({
  imports: [
    MulterModule.register({
      dest: './uploads'
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
      SheduleMatch,User,Team,League,StandingEntity]),
    AuthModule,UserModule, SheduleMatchModule, PlayerModule, LeagueModule, SportModule, 
    TeamModule, AuthModule,CommentModule,StandingModule,LeagueTeamModule,InfoMatchModule,UserInfoMatchModule
      ],
  controllers: [AppController],
  providers: [AppService,
              UserService,
              TeamService,
              StandingService,
              LeagueService,

              
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
