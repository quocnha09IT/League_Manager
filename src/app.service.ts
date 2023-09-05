import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { format, startOfDay } from 'date-fns';
import * as moment from 'moment-timezone';
import { SheduleMatch } from './modules/shedule-match/entities/shedule-match.entity';
import { MoreThan, Repository } from 'typeorm';
import { Response } from 'express';
import { MailerService } from '@nestjs-modules/mailer';
import { UserService } from './modules/user/user.service';
import { SheduleMatchService } from './modules/shedule-match/shedule-match.service';
import { TeamService } from './modules/team/team.service';
import { StandingService } from './modules/standing/standing.service';
import { LeagueService } from './modules/league/league.service';


@Injectable()
export class AppService {
  private formattedToday: string;
  constructor(@InjectRepository(SheduleMatch)
  private sheduleRepository: Repository<SheduleMatch>,
  private userService: UserService,
  private teamService: TeamService,
  private standingService: StandingService,
  private leagueService: LeagueService)
  {
    this.formattedToday = this.getFormattedTodayDate(); 
  }

  getFormattedTodayDate(): string {
    const today = startOfDay(new Date());
    const formattedToday = format(today, 'yyyy-MM-dd');
    return formattedToday;
  }

  async GetAllData(){
    const league = await this.leagueService.getLeague();
    const schedule = await this.sheduleRepository.find();
    const standing = await this.standingService.Getstanding();
    const team = await this.teamService.GetTeam();
    return  {league, schedule, standing,team}

  }


  
  async findSheduleToday() :Promise<SheduleMatch[]>{ 
    const query = `SELECT * FROM shedule_match WHERE "date" = '${this.formattedToday}'`;
    const scheduleMatch = await this.sheduleRepository.query(query);
    return scheduleMatch;
   
   }

  

   async getShedule(date: string){
    const query = `SELECT * FROM shedule_match WHERE 
    EXTRACT(MONTH FROM "date") = EXTRACT(MONTH FROM '${date}'::DATE) AND
    EXTRACT(DAY FROM "date") = EXTRACT(DAY FROM '${date}'::DATE);`;
    const scheduleMatch = await this.sheduleRepository.query(query);
    return scheduleMatch;
   }

   async getUser(){
    
    return await this.userService.getUser();

    // this.mailerService.sendMail({
    //   to: 'dqnha.20it9@gmail.com',
    //   from: 'quocnha09@gmail.com',
    //   subject: 'Test',
    //   text: 'wellcom',
    // });
   }

   async getSheduleMatch(tomorrow: Date){
    const nextSchedule = await this.sheduleRepository.find({where: {date : tomorrow}})

    return nextSchedule; 
    
   }


   async getTeam(teamId: number){
    return await this.teamService.findTeam(teamId)
   }


  }
