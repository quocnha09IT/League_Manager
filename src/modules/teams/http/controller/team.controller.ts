import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, UseInterceptors, UploadedFile, ParseFilePipeBuilder, BadRequestException, UploadedFiles, Res, Query, Version, Put, HttpCode, HttpStatus } from '@nestjs/common';
import { TeamService } from '../../team.service';
import { CreateTeamDto } from '../dto/create-team.dto';
import { Roles } from 'src/decorator/roles.decorator';
import { Role } from 'src/common/enum/role.enum';
import { Team } from '../../entities/team.entity';
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiOperation, ApiParam, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { CustomFileInterceptor } from '../validators/custom-file.validator';
import { UploadLogoTeam } from '../dto/upload-logo.dto';

@Controller('teams')
@ApiTags('Team')
export class TeamController {
  constructor(private readonly teamService: TeamService,
    ) {}
  @Get('search')
  @ApiOperation({summary: 'search'})
  async searchTeam(@Query('key')key: string):Promise<Team[]>{
    return this.teamService.searchTeam(key);
  }

  @Get()
  @ApiBearerAuth('Bearer')
  @ApiOperation({summary: 'find all team'})
  @Roles(Role.MANAGE_TEAM, Role.MANAGE_LEAGUE)
  @HttpCode(HttpStatus.NO_CONTENT)
  findAll():Promise<Team[]> {
    return this.teamService.findAll();
  }

  @Get(':id')
  @ApiOperation({summary:'get league of team'})
  @HttpCode(HttpStatus.NO_CONTENT)
  async getLeagueOfTeam(@Query('id') id : number):Promise<Team[]>{
    return await this.teamService.getLeagueOfTeam(id)
  }

  @Version('1')
  @Post()
  @ApiConsumes('multipart/form-data') 
  @UseInterceptors(FileInterceptor('logoTeam'), CustomFileInterceptor) 
  @ApiBody({ type: CreateTeamDto })
  async createFile(@UploadedFile() file: Express.Multer.File,@Body()createTeam: CreateTeamDto) { 
    const containerName = 'demo1'; 
      const upload = await this.teamService.uploadFile(file, containerName) 
      console.log(upload)
      this.teamService.saveUrl(createTeam,upload); 
     
      return { upload, message: 'uploaded successfully' } 
  } 

  @Delete(':id')
  @ApiConsumes('multipart/form-data') 
  @UseInterceptors(FileInterceptor('logoTeam'))
  async removeTeam(@Query('id') id:number) {
    const containerName = 'demo1';
    const user = await this.teamService.deleteTeam(id, containerName);
    return {
      user,
      message: 'deleted successfully'
    }
  }

  @Put('upload-logo-teams')
  @ApiConsumes('multipart/form-data') 
  @UseInterceptors(FileInterceptor('logoTeam'), CustomFileInterceptor) 
  @ApiBody({ type: UploadLogoTeam })
  async uploadLogoTeam(@UploadedFile() file: Express.Multer.File,@Query('id') id: number) { 
    const containerName = 'demo1'; 
      const upload = await this.teamService.uploadFile(file, containerName) 
      console.log(upload)
      this.teamService.uploadLogoTeam(upload,id); 
     
      return { upload, message: 'uploaded successfully' } 
  } 
}
