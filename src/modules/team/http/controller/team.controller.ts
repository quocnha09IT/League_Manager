import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, UseInterceptors, UploadedFile, ParseFilePipeBuilder, BadRequestException, UploadedFiles, Res } from '@nestjs/common';
import { TeamService } from '../../team.service';
import { CreateTeamDto } from '../../dto/create-team.dto';
import { UpdateTeamDto } from '../../dto/update-team.dto';
import { Roles, User } from 'src/decorator/roles.decorator';
import { Role } from 'src/common/role.enum';
import { RolesGuard } from 'src/auth/guards.roles';
import { Team } from '../../entities/team.entity';
import { Player } from '../../../player/entities/player.entity';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { fileURLToPath } from 'url';

@Controller('teams')
@ApiTags('Team')
export class TeamController {
  constructor(private readonly teamService: TeamService) {}
  
  @Post('')
  @ApiOperation({summary: 'create new Team'})
  @ApiBody({
    
    schema: {
      type: 'object',
      properties: {
        nameTeam:{
          type: 'string',
          example: 'liverpool',
          description: 'this is the name of team'
        },

        logoTeam:{
          type: 'string',
          example: 'LIVER',
          description: 'this is the logo team',
        },
        leagueId:{
          type: 'integer',
          example: 1,
          description: 'this is the league of team',
        },
      }
    }
  })
  @ApiResponse({
    status: 201,
    description: 'save....'
  })
  @ApiResponse({
    status: 403,
    description: 'Fobiden....'
  })
  create(@Body() createTeamDto: CreateTeamDto) {
    return this.teamService.create(createTeamDto);
  }



  @Get()
  @ApiBearerAuth('Bearer')
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
  findAll() {
    return this.teamService.findAll();
  }


  // @UseInterceptors(FileInterceptor('file'))
  // @Post('file')
  // uploadFileAndFailValidation(
  //   @Body() body: CreateTeamDto,
  //   @UploadedFile(
  //     new ParseFilePipeBuilder()
  //       .addFileTypeValidator({
  //         fileType: 'jpg',
  //       })
  //       .build(),
  //   )
  //   file: Express.Multer.File,
  // ) {
  //   return {
  //     body,
  //     file: file.buffer.toString(),
  //   };
  // }



   
  // @UseInterceptors(FileInterceptor('file',{
  //   storage:diskStorage({
  //     destination:"./uploads",
  //     filename:(req,file,cb)=>{
  //       const name = file.originalname.split(".")[0];
  //       const fildExtention = file.originalname.split(".")[1];
  //       const newFileName = name.split(".").join("_")+"_"+ Date.now() + "." +fildExtention;
  //       cb(null,newFileName)
  //     }
  //   }),
  //   fileFilter: (req,file,cb)=>{
  //     if(!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)){
  //       return cb(null,false)
  //     }
  //   }
  // }))
  @Post('file/:id')
  @UseInterceptors(FileInterceptor('file',{
      storage:diskStorage({
        destination:"uploads",
        filename:(req,file,cb)=>{
          const name = file.originalname.split(".")[0];
          const fildExtention = file.originalname.split(".")[1];
          const newFileName = name.split(".").join("_")+"_"+ Date.now() + "." +fildExtention;
          cb(null,newFileName)
        }
      }),
      // fileFilter: (req,file,cb)=>{
      //   if(!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)){
      //     return cb(null,false)
      //   }
      // }
    }))
  uploadPhoto(@UploadedFile()file:Express.Multer.File, @Param('id') id: number){
    
    // console.log(file)
    if(!file){ throw new BadRequestException('file not is a image')}
    else{
      this.teamService.updateLogo(file.destination+'/'+file.filename,id)
      const response = {
        filePath: `http://localhost:3232/teams/file/${file.filename}`
      };
      return response;
    }

  }

  // @Get(':imgpath')
  // seeUploadsFile(@Param('imgpath') image, @Res() res){
  //   return res.sendFile(image,{root:'uploads'})
  // }

  
  // uploadFileAndFailValidation(
  //   @Body() body: CreateTeamDto,
  //   @UploadedFile(
  //     new ParseFilePipeBuilder()
  //       .addFileTypeValidator({
  //         fileType: 'jpg',
  //       })
  //       .build(),
  //   )
  //   file: Express.Multer.File,
  // ) {
  //   return {
  //     body,
  //     file: file.buffer.toString(),
  //   };
  // }



  // @Roles(Role.MANAGE_TEAM, Role.MANAGE_LEAGUE)
  // @Get(':id')
  // @ApiBearerAuth('Bearer')
  // @ApiOperation({summary:'get the team folow id'})
  // @ApiParam({
  //   name: 'id',
  //   type: 'integer',
  //   description: 'enter unique id',
  //   required: true
  // })
  // @ApiResponse({
  //   status: 201,
  //   description: 'save....'
  // })
  // @ApiResponse({
  //   status: 403,
  //   description: 'Fobiden....'
  // })
  // @ApiResponse({
  //   status: 500,
  //   description: 'Internal server error....'
  // })
  // async findById(@Param('id') id: number): Promise<Team> {
  //   return this.teamService.findByIdWithPlayers(id);
  // }


  @Get(':id')
  @ApiOperation({summary:'get league of team'})
  @ApiParam({
    name: 'id',
    type: 'integer',
    description: 'enter unique id team',
    required: true
  })
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
  async getLeagueOfTeam(@Param('id') id : number){
    return this.teamService.getLeagueOfTeam(id)
  }


}
