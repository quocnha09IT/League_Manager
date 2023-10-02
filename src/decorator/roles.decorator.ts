import { ExecutionContext, SetMetadata, UseGuards, applyDecorators, createParamDecorator } from '@nestjs/common';
import { AuthGuard } from 'src/auth/auth.guard';
import { RolesGuard } from 'src/auth/guards.roles';
import { Role } from 'src/common/enum/role.enum';
import { GqlExecutionContext } from '@nestjs/graphql';

export const ROLES_KEY = 'roles';
export function Roles (...roles: Role[]){
    return applyDecorators(
        SetMetadata(ROLES_KEY,roles),
        UseGuards(AuthGuard,RolesGuard)
        
    )
}
export const User = createParamDecorator(
    (data: unknown, context: ExecutionContext) => {
      
      const request = context.switchToHttp().getRequest();
      const user = request.user.id;
      return user;
    },
  );
