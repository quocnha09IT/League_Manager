import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRepository } from './repository/user.repository';

@Injectable()
export class UserService {
  constructor(@InjectRepository(User)
    private userRepository:UserRepository,
  ){}
 

  async getUser() : Promise<User[]>{
    const user =  await this.userRepository.find({where:{roles: 'user'}});
    return user;
  }

  findOne(email: any): Promise<User | undefined> {
    return this.userRepository.findOne({where:{email}});
  }

 


}
