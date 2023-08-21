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
  create(createUserDto: CreateUserDto) {
    return 'This action adds a new user';
  }

  findAll() : Promise<User[]>{
    return this.userRepository.find();
  }

  findOne(email: any): Promise<User | undefined> {
    return this.userRepository.findOne({where:{email}});
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
