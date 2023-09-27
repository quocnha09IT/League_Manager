import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, UseInterceptors, UploadedFile, ParseFilePipeBuilder, BadRequestException, UploadedFiles, Res, Query, Version, Put } from '@nestjs/common';
import { TeamService } from '../../team.service';
import { CreateTeamDto, UploadedFileDto } from '../../dto/create-team.dto';
import { UpdateTeamDto } from '../../dto/update-team.dto';
import { Roles, User } from 'src/decorator/roles.decorator';
import { Role } from 'src/common/enum/role.enum';
import { RolesGuard } from 'src/auth/guards.roles';
import { Team } from '../../entities/team.entity';
import { Player } from '../../../player/entities/player.entity';
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiOperation, ApiParam, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { fileURLToPath } from 'url';
import { query } from 'express';

@Controller('teams')
@ApiTags('Team')
export class TeamController {
  constructor(private readonly teamService: TeamService,
              
    
    ) {}
  
  @Post()
  @ApiOperation({summary: 'create new Team'})
  @ApiResponse({
    status: 201,
    description: 'save....'
  })
  @ApiResponse({
    status: 403,
    description: 'Fobiden....'
  })
  create(@Body() createTeamDto: CreateTeamDto):Promise<Team[]|void> {
    return this.teamService.create(createTeamDto);
  }



  @Get('search')
  @ApiOperation({summary: 'search'})
  async searchTeam(@Query('key')key: string):Promise<Team[]>{
    return this.teamService.searchTeam(key);
  }



  @Get()
  @ApiBearerAuth('Bearer')
  @ApiOperation({summary: 'find all team'})
  @Roles(Role.MANAGE_TEAM, Role.MANAGE_LEAGUE)
  @ApiOperation({summary:'get all the team'})
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
  findAll():Promise<Team[]> {
    return this.teamService.findAll();
  }



  
 
  // @Post('files/:id')
  // @ApiOperation({summary:'upload file for team '})
  // @UseInterceptors(FileInterceptor('file',{
  //     storage:diskStorage({
  //       destination:"uploads",
  //       filename:(req,file,cb)=>{
  //         const name = file.originalname.split(".")[0];
  //         const fildExtention = file.originalname.split(".")[1];
  //         const newFileName = name.split(".").join("_")+"_"+ Date.now() + "." +fildExtention;
  //         cb(null,newFileName)
  //       }
  //     }),
  //     // fileFilter: (req,file,cb)=>{
  //     //   if(!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)){
  //     //     return cb(null,false)
  //     //   }
  //     // }
  //   }))
  // uploadPhoto(@UploadedFile()file:Express.Multer.File, @Param('id') id: number){
    
  //   // console.log(file)
  //   if(!file){ throw new BadRequestException('file not is a image')}
  //   else{
  //     this.teamService.updateLogo(file.destination+'/'+file.filename,id)
  //     const response = {
  //       filePath: `http://localhost:3232/teams/file/${file.filename}`
  //     };
  //     return response;
  //   }

  // }

  

  


  @Get(':id')
  @ApiOperation({summary:'get league of team'})
  @ApiResponse({
    status: 201,
    description: 'successfully....'
  })
  @ApiResponse({
    status: 403,
    description: 'Fobiden....'
  })
  @ApiResponse({
    status: 500,
    description: 'Internal server error....'
  })
  async getLeagueOfTeam(@Query('id') id : number):Promise<Team[]>{
    return await this.teamService.getLeagueOfTeam(id)
  }





  @Version('1')
  @Post('upload')
  @ApiConsumes('multipart/form-data') 
  @UseInterceptors(FileInterceptor('logoTeam')) 
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
}
