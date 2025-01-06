import { PartialType } from '@nestjs/mapped-types';
import { CreateEmployeeDto } from './create-employee.dto';
import { Expose } from 'class-transformer';

export class UpdateEmployeeDto extends PartialType(CreateEmployeeDto) {}

export class UpdateEmployeeResponseDto {
  @Expose()
  id: string;

  @Expose()
  name: string;

  @Expose()
  firstName: string;

  @Expose()
  dateCreated: Date;

  @Expose()
  department: string;
}
