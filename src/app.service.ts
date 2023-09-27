import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { format, startOfDay } from 'date-fns';
import * as moment from 'moment-timezone';
import { SheduleMatch } from './modules/shedule-match/entities/shedule-match.entity';
import {  Like, MoreThan, Repository } from 'typeorm';
import { Response } from 'express';
import { MailerService } from '@nestjs-modules/mailer';
import { UserService } from './modules/user/user.service';
import { SheduleMatchService } from './modules/shedule-match/shedule-match.service';
import { TeamService } from './modules/team/team.service';
import { StandingService } from './modules/standing/standing.service';
import { LeagueService } from './modules/league/league.service';
import { PlayerService } from './modules/player/player.service';
import { BlobServiceClient, BlockBlobClient } from '@azure/storage-blob';


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


   async getTeam(teamId: number){
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



  //  azureConnection = "DefaultEndpointsProtocol=https;AccountName=pbl6;AccountKey=xtw43ZLKyhPH+7MowCusDbarc0e8C8yH7TC9fd+EDmQBf0m4tNw113IfYvjcWa/9606g5FXEdkUI+AStaX7tog==;EndpointSuffix=core.windows.net";
  //  containerName = "demo1";
  //   getBlobClient(imageName:string):BlockBlobClient{
  //    const blobClientService = BlobServiceClient.fromConnectionString(this.azureConnection);
  //    const containerClient = blobClientService.getContainerClient(this.containerName);
  //    const blobClient = containerClient.getBlockBlobClient(imageName);
  //    return blobClient;
  //  }

  //  async upload(file:Express.Multer.File){
  //   const blobClient = this.getBlobClient(file.originalname);
  //    await blobClient.uploadData(file.buffer);
  // }


  }
