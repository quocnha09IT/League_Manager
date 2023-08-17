import { PartialType } from '@nestjs/mapped-types';
import { CreateSheduleMatchDto } from './create-shedule-match.dto';

export class UpdateSheduleMatchDto extends PartialType(CreateSheduleMatchDto) {}
