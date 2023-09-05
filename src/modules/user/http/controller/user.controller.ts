import { Controller, Get, Post, Body, Patch, Param, Delete, Put } from '@nestjs/common';
import { UserService } from '../../user.service';
import { CreateUserDto } from '../../dto/create-user.dto';
import { UpdateUserDto } from '../../dto/update-user.dto';
import { Roles } from 'src/decorator/roles.decorator';
import { Role } from 'src/common/role.enum';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';

@Controller('users')
@ApiTags('User')
export class UserController {
  constructor(private readonly userService: UserService) {}

  // @Post()
  // @ApiBearerAuth('Bearer')
  // @ApiOperation({summary: 'create new user'})
  // @ApiBody({
    
  //   schema: {
  //     type: 'object',
  //     properties: {

  //       name:{
  //         type: 'string',
  //         example: 'Son Heuming',
  //         description: 'this is the name of user'
  //       },

  //       email:{
  //         type: 'string',
  //         example: 'son@gmail.com',
  //         description: 'this is the email user',
  //       },

  //       password:{
  //         type: 'string',
  //         example: '123456',
  //         description: 'this is the password user',
  //       },

  //       address:{
  //         type: 'string',
  //         example: 'Sur Prance',
  //         description: 'this is the address of user',
  //       },

  //       sex:{
  //         type: 'boolean',
  //         example: true,
  //         description: 'this is the sex of user'
  //       }
  //     }
  //   }
  // })
  // @ApiResponse({
  //   status: 201,
  //   description: 'save....'
  // })
  // @ApiResponse({
  //   status: 403,
  //   description: 'Fobiden....'
  // })
  // create(@Body() createUserDto: CreateUserDto) {
  //   return this.userService.create(createUserDto);
  // }

  // @Get()
  // @ApiBearerAuth('Bearer')
  // @ApiOperation({summary:'get all the user'})
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
  // @Roles(Role.USER)
  // findAll() {
  //   return this.userService.findAll();
  // }


  // @Put(':id')
  // @ApiBearerAuth('Bearer')
  // @ApiOperation({summary: 'update shedule match'})
  // @ApiParam({
  //   name: 'id',
  //   type: 'integer',
  //   description: 'enter unique id',
  //   required: true
  // })
  // @ApiBody({
    
  //   schema: {
  //     type: 'object',
  //     properties: {

  //       name:{
  //         type: 'string',
  //         example: 'Son Heuming',
  //         description: 'this is the name of user'
  //       },

  //       email:{
  //         type: 'string',
  //         example: 'son@gmail.com',
  //         description: 'this is the email user',
  //       },

  //       password:{
  //         type: 'string',
  //         example: '123456',
  //         description: 'this is the password user',
  //       },

  //       address:{
  //         type: 'string',
  //         example: 'Sur Prance',
  //         description: 'this is the address of user',
  //       },

  //       sex:{
  //         type: 'boolean',
  //         example: true,
  //         description: 'this is the sex of user'
  //       }
  //     }
  //   }
    
  // })
  // @ApiResponse({
  //   status: 201,
  //   description: 'update successfully....'
  // })
  // @ApiResponse({
  //   status: 403,
  //   description: 'Fobiden....'
  // })
  // update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
  //   return this.userService.update(+id, updateUserDto);
  // }

  // @Delete(':id')
  // @ApiBearerAuth('Bearer')
  // @ApiOperation({summary:' delete user'})
  // @ApiParam({
  //   name: 'id',
  //   type: 'integer',
  //   description: 'enter unique id',
  //   required: true
  // })
  // @ApiResponse({
  //   status: 201,
  //   description: 'delete successfully....'
  // })
  // @ApiResponse({
  //   status: 403,
  //   description: 'Fobiden....'
  // })
  // remove(@Param('id') id: string) {
  //   return this.userService.remove(+id);
  // }
}
