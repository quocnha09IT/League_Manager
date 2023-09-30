import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { Like, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRepository } from './repositories/user.repository';

@Injectable()
export class UserService {
  constructor(@InjectRepository(User)
    private userRepository:UserRepository,
  ){}
 

  async getUser() : Promise<User[]>{
    const user =  await this.userRepository.find({where:{roles: 'user'}});
    return user;
  }

  async findOne(email: any): Promise<User | undefined> {
    return await this.userRepository.findOne({where:{email}});
  }

  async search(key: string):Promise<User[]>{
    return await this.userRepository.find({where:{name: Like(`%${key}%`)}})
  }


  async createUser(createUserDto: CreateUserDto):Promise<User[]|any>{
    return await this.userRepository.save(createUserDto);
  }
}
