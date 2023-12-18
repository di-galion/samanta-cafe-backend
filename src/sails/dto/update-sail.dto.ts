import { PartialType } from '@nestjs/mapped-types';
import { CreateSailDto } from './create-sail.dto';

export class UpdateSailDto extends PartialType(CreateSailDto) {}
