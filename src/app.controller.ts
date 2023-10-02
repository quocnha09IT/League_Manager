import * as cron from 'node-cron';
import * as nodemailer from 'nodemailer';
import { AppService } from './app.service';
import { ApiBearerAuth, ApiOperation, ApiParam, ApiQuery, ApiResponse } from '@nestjs/swagger';
import { Controller,Post, Get, Query, UseInterceptors, UploadedFile, HttpCode, HttpStatus} from '@nestjs/common';
import { map, takeUntil } from 'rxjs/operators';
import { MailerService } from '@nestjs-modules/mailer';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('home')
export class AppController {
  constructor(private readonly appService: AppService,
    private mailService : MailerService,
    ){}

  getTodayDateTime() {
    return this.appService.getFormattedTodayDate();
  }

  @Get('HomePage')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({summary:'get all api to home page '})
  async GetAllData(){
    return await this.appService.GetAllData()
  }

  @Get('')
  @ApiOperation({summary:'get all the shedule match today '})
  @HttpCode(HttpStatus.NO_CONTENT)
  findSheduleToday() {
    return this.appService.findSheduleToday();
  }

  @Get('mail')
  @ApiOperation({summary:'send mail to user'})
  async sendMail(){
     cron.schedule('40 16 * * *', async () =>{ const user =  await this.appService.getUser()
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
      Venue: ${sheduleMatch[0].matchvenue}
    
      It's going to be an exciting match between:
      Home team: ${awayteam[0].nameteam}
      Away team: ${hometeam[0].nameteam}
    
      Don't miss out on this thrilling match! Make sure to mark your calendar and join us.
    
      Thank you for your support!
    
      Best regards,
      Your Team
      `
    });
     }
   });  
  }

  @Get('search')
  @ApiOperation({summary:'search'})
  @HttpCode(HttpStatus.NO_CONTENT)
   async search(@Query('key') key : string){
    return await this.appService.search(key);
   }

  @Get('date')
  @ApiOperation({summary:'the shedule match'})
  @ApiQuery({
    name: 'date',
    type: 'string',
    description: 'enter date in the format YYYY-MM-DD',
    required: true
  })
  @HttpCode(HttpStatus.NO_CONTENT)
  async getShedule(@Query('date') date: string){
    return this.appService.getShedule(date);
  }
  
}
