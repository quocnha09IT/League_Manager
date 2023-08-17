import { Controller, Get, Param } from '@nestjs/common';
import { AppService } from './app.service';
import { ApiBearerAuth, ApiOperation, ApiParam, ApiResponse } from '@nestjs/swagger';

@Controller('all')
export class AppController {
  constructor(private readonly appService: AppService) {}

  getTodayDateTime() {
    return this.appService.getFormattedTodayDate();
  }

  @Get()
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



  @Get(':date')
  @ApiOperation({summary:'the shedule match'})
  @ApiParam({
    name: 'date',
    type: 'string',
    description: 'enter date',
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
