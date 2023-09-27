import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Role } from 'src/common/enum/role.enum';
import { ROLES_KEY } from 'src/decorator/roles.decorator';
import { JwtService } from "@nestjs/jwt";
import { ConfigService } from "@nestjs/config";

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector,
    private configService :ConfigService,
    private jwtService: JwtService) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY,[
      context.getHandler(),
      context.getClass()
  ])
  if(!requiredRoles) {
    return true;
}
    const request = context.switchToHttp().getRequest();
    const user = request.user;
    
    return   requiredRoles.some((role) => user.roles?.includes(role));
    // const idUser =requiredRoles.some((role) => user.id?.includes(role));
    // return [ roleUser , idUser];
            
        
  }
}

