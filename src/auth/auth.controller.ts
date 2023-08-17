import { Body, Controller, Get, Post, UseGuards,Request } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from './auth.guard';
import { ApiBearerAuth, ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';

@Controller('auth')
@ApiTags('Authentication')
export class AuthController {
    constructor(private authService: AuthService){}
    @ApiBearerAuth('bearer')
    @Post('login')
    @ApiBody({
        schema: {
            type: 'object',
            properties:{
                email:{
                    type: 'string',
                    example:'beckham@gmail.com',
                    description: 'this is the email',
                },

                password:{
                    type: 'string',
                    example: '123456',
                    description: 'this is the password'
                }

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
    signIn(@Body() signInDto: Record<string,any>){
        return this.authService.signIn(signInDto.email, signInDto.password);
    }

    @UseGuards(AuthGuard)
    @Get('users')
    GetUser(@Request() req){
        return req.user;
    }
}
