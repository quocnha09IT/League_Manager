import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Roles } from 'src/decorator/roles.decorator';
import { UserService } from 'src/modules/user/user.service';

@Injectable()
export class AuthService {
    constructor(private userService: UserService,
        private jwtService: JwtService){}

    async signIn(email: string , pass: string):Promise<any>{
        const user = await this.userService.findOne(email);

        if(user?.password  !== pass){
            throw new UnauthorizedException()
        }
        const payload = {sub: user.id, email: user.email, roles: user.roles, id: user.id}
        // console.log(this.jwtService.signAsync(payload))
        return {
            access_token: await this.jwtService.signAsync(payload)
        }
    }
}
