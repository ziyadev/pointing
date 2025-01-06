import { Expose, Type } from 'class-transformer';
import { GetEmployeeResponseDto } from './get-employee.dto';
import {
  IsDateString,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class GetAllEmployeesQueryDto {
  @ApiProperty({ description: 'Date of creation of the employee' })
  @IsOptional()
  @IsDateString()
  dateCreated?: Date;

  @ApiProperty({ description: 'Department of the employee' })
  @IsOptional()
  @IsNotEmpty()
  @IsString()
  department?: string;
}

export class GetAllEmployeesResponseDto {
  @ApiProperty({
    type: [GetEmployeeResponseDto],
    isArray: true,
    description: 'List of employees',
  })
  @Expose()
  @Type(() => GetEmployeeResponseDto)
  employees: GetEmployeeResponseDto[];
}
