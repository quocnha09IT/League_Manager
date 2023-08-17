import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserModule } from 'src/modules/user/user.module';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './auth.constants';
import { ConfigModule } from '@nestjs/config';
import { UserService } from 'src/modules/user/user.service';
import { TypeORMError } from 'typeorm';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/modules/user/entities/user.entity';

@Module({
  controllers: [AuthController],
  providers: [AuthService,UserService],
  imports: [
    TypeOrmModule.forFeature([User]),
    UserModule,
    ConfigModule,
    JwtModule.register({
      global: true,
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '10h' },
    }),
  ]
})
export class AuthModule {}
