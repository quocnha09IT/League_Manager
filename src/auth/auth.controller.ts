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
    @ApiResponse({
        status: 201,
        description: 'save....'
      })
    @ApiResponse({
        status: 403,
        description: 'Fobiden....'
      })
    @ApiBearerAuth()
    signIn(@Body() signInDto: Record<string,any>){
        return this.authService.signIn(signInDto.email, signInDto.password);
    }


    
    @UseGuards(AuthGuard)
    @Get('users')
    GetUser(@Request() req){
        return req.user;
    }


    
}
