import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { format, startOfDay } from 'date-fns';
import * as moment from 'moment-timezone';
import { SheduleMatch } from './modules/shedule-match/entities/shedule-match.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AppService {
  private formattedToday: string;
  constructor(@InjectRepository(SheduleMatch)
  private sheduleRepository: Repository<SheduleMatch>,
  ){
    this.formattedToday = this.getFormattedTodayDate(); 
  }

  getFormattedTodayDate(): string {
    const today = startOfDay(new Date());
    const formattedToday = format(today, 'yyyy-MM-dd');
    return formattedToday;
  }
  
  async findSheduleToday() :Promise<SheduleMatch[]>{ 
    const query = `SELECT * FROM shedule_match WHERE "date" = '${this.formattedToday}'`;
    const scheduleMatch = await this.sheduleRepository.query(query);
    return scheduleMatch;
   
   }

  

   async getShedule(date: string){
    const query = `SELECT * FROM shedule_match WHERE "date" = '${date}'`;
    const scheduleMatch = await this.sheduleRepository.query(query);
    return scheduleMatch;
   }
  }
