import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { format, startOfDay } from 'date-fns';
import * as moment from 'moment-timezone';
import { SheduleMatch } from './modules/shedule-matchs/entities/shedule-match.entity';
import {  Like, MoreThan, Repository } from 'typeorm';
import { Response } from 'express';
import { MailerService } from '@nestjs-modules/mailer';
import { UserService } from './modules/users/user.service';
import { SheduleMatchService } from './modules/shedule-matchs/shedule-match.service';
import { TeamService } from './modules/teams/team.service';
import { StandingService } from './modules/standings/standing.service';
import { LeagueService } from './modules/leagues/league.service';
import { PlayerService } from './modules/players/player.service';
import { BlobServiceClient, BlockBlobClient } from '@azure/storage-blob';
import { Team } from './modules/teams/entities/team.entity';


@Injectable()
export class AppService {
  private formattedToday: string;
  constructor(@InjectRepository(SheduleMatch)
  private sheduleRepository: Repository<SheduleMatch>,
  private userService: UserService,
  private teamService: TeamService,
  private standingService: StandingService,
  private leagueService: LeagueService,
  private playerService: PlayerService,
  )
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
    const scheduleMatch = await this.sheduleRepository.find({
      where:{
        date: this.formattedToday,
      },
      order: {
        matchvenue:"DESC",
      }
    });
    return scheduleMatch;   
   }

   async getShedule(date: string){
    const scheduleMatch = await this.sheduleRepository.find({where:{date: date}});
    return scheduleMatch;
   }

   async getUser(){
    return await this.userService.getUser();
   }

   async getSheduleMatch(tomorrow: Date){
    const nextSchedule = await this.sheduleRepository.find({where: {date : tomorrow}})
    return nextSchedule; 
    
   }

   async getTeam(teamId: number):Promise<Team[]>{
    return await this.teamService.findTeam(teamId)
   }

   async search(key: string){
    const schedule = await this.sheduleRepository.createQueryBuilder().select()
    .where('matchvenue ILIKE :searchQuery', { searchQuery: `%${key}%` })
    .orderBy('matchvenue', 'DESC')
    .getMany();
    const team = await this.teamService.searchTeam(key)
    const player = await this.playerService.findPlayer(key)
    const league = await this.leagueService.findLeague(key)
    return  {schedule,team,player,league}
   }
  }
