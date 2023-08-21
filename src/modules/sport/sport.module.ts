import { Module } from '@nestjs/common';
import { SportService } from './sport.service';
import { SportController } from './http/controller/sport.controller';

@Module({
  controllers: [SportController],
  providers: [SportService],
})
export class SportModule {}
