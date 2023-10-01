import { Controller, Get, Post, Body, Patch, Param, Delete, Put, HttpStatus, HttpCode } from '@nestjs/common';
import { UserService } from '../../user.service';
import { CreateUserDto } from '../../dto/create-user.dto';
import { UpdateUserDto } from '../../dto/update-user.dto';
import { Roles } from 'src/decorator/roles.decorator';
import { Role } from 'src/common/enum/role.enum';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';

@Controller('users')
@ApiTags('User')
export class UserController {
  constructor(private readonly userService: UserService,
             ){}

  @Post('signup')
  @HttpCode(HttpStatus.CREATED)
  async signup(@Body() createUserDto: CreateUserDto){
    await this.userService.createUser(createUserDto);
    return { message: 'User registered successfully' };
  }
}