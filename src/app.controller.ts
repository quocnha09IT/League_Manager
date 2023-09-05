import * as cron from 'node-cron';
import * as nodemailer from 'nodemailer';
import { AppService } from './app.service';
import { ApiBearerAuth, ApiOperation, ApiParam, ApiResponse } from '@nestjs/swagger';
import { Controller, Get, MessageEvent, Param, Res, Sse ,Logger} from '@nestjs/common';
import { Response } from 'express';
import { readFileSync } from 'fs';
import { join } from 'path';
import { interval, Observable, Subject } from 'rxjs';
import { map, takeUntil } from 'rxjs/operators';
import { MailerService } from '@nestjs-modules/mailer';

@Controller('all')
export class AppController {
  constructor(private readonly appService: AppService,
    private mailService : MailerService,

    ) {}

  getTodayDateTime() {
    return this.appService.getFormattedTodayDate();
  }


  @Get('Api')
  async GetAllData(){
    return await this.appService.GetAllData()
  }

  @Get('')
  @ApiOperation({summary:'get all the shedule match today '})
  @ApiResponse({
    status: 201,
    description: 'save....'
  })
  @ApiResponse({
    status: 403,
    description: 'Fobiden....'
  })
  @ApiResponse({
    status: 500,
    description: 'Internal server error....'
  })
  findSheduleToday() {
    return this.appService.findSheduleToday();
  }

  @Get('mail')
  async sendMail(){
    
     cron.schedule('44 17 * * *', async () =>{ const user =  await this.appService.getUser()
     const emails = user.map((user) => user.email);  
     const names = user.map((user) => user.name); 
     const today = new Date();
     const tomorrow = new Date(today);
     tomorrow.setDate(today.getDate() + 1);

     const sheduleMatch = await this.appService.getSheduleMatch(tomorrow);
     if(sheduleMatch.length > 0) {
     const awayteam = await this.appService.getTeam(sheduleMatch[0].awayTeamId)
     const hometeam = await this.appService.getTeam(sheduleMatch[0].homeTeamId)

     await this.mailService.sendMail({
      to: emails,
      subject: `SCHEDULE MATCH ${sheduleMatch[0].date}`,
      text: `Hello,
    
      We are excited to inform you about an upcoming match! Here are the details:
    
      Date: ${sheduleMatch[0].date}
      Time: ${sheduleMatch[0].time}
      Venue: ${sheduleMatch[0].matchVenue}
    
      It's going to be an exciting match between:
      Home team: ${awayteam[0].nameTeam}
      Away team: ${hometeam[0].nameTeam}
    
      Don't miss out on this thrilling match! Make sure to mark your calendar and join us.
    
      Thank you for your support!
    
      Best regards,
      Your Team
      `
    });
     }
   });
    
  }

  // @Get('notifications')
  // index(@Res() response: Response) {
  //   response
  //     .type('text/html')
  //     .send(readFileSync(join(__dirname, 'index.html')).toString());
  // }
  // private stopInterval$ = new Subject<void>();
  // @Sse('sse')
  // sse(): Observable<MessageEvent> {
  // return interval(3000)
  // .pipe(
  //   map((_) => ({ data: { hello: this.appService.getFormattedTodayDate() } })),
  //   takeUntil(this.stopInterval$) // Ngắt khi stopInterval$ phát ra giá trị
  // )
  // }

  // @Get('maag')
  // maag(){
  //   this.stopInterval$.next();
  // }



  @Get(':date')
  @ApiOperation({summary:'the shedule match'})
  @ApiParam({
    name: 'date',
    type: 'string',
    description: 'enter date in the format YYYY-MM-DD',
    required: true
  })
  @ApiResponse({
    status: 201,
    description: 'save....'
  })
  @ApiResponse({
    status: 403,
    description: 'Fobiden....'
  })
  @ApiResponse({
    status: 500,
    description: 'Internal server error....'
  })
  async getShedule(@Param('date') date: string){
    return this.appService.getShedule(date);
  }


 


  
  
}
