import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { SportService } from '../../sport.service';
import { CreateSportDto } from '../../dto/create-sport.dto';
import { UpdateSportDto } from '../../dto/update-sport.dto';
import { ApiTags } from '@nestjs/swagger';

@Controller('sports')
@ApiTags('Sport')
export class SportController {
  constructor(private readonly sportService: SportService) {}

  
}
