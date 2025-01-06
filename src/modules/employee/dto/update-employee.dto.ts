import { PartialType } from '@nestjs/mapped-types';
import { CreateEmployeeDto } from './create-employee.dto';
import { Expose } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateEmployeeDto extends PartialType(CreateEmployeeDto) {}

export class UpdateEmployeeResponseDto {
  @ApiProperty({
    description: 'Unique identifier of the employee',
    required: true,
  })
  @Expose()
  id: string;

  @ApiProperty({ description: 'Name of the employee', required: false })
  @Expose()
  name: string;

  @ApiProperty({ description: 'First name of the employee', required: false })
  @Expose()
  firstName: string;

  @ApiProperty({
    description: 'Date of creation of the employee',
    required: false,
  })
  @Expose()
  dateCreated: Date;

  @ApiProperty({ description: 'Department of the employee', required: false })
  @Expose()
  department: string;
}
