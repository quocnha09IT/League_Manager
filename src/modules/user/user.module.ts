import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { AuthModule } from 'src/auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';

@Module({

  imports:[ConfigModule,
        TypeOrmModule.forFeature([User]),
  ],
  controllers: [UserController],
  providers: [UserService],
  
})
export class UserModule {}
