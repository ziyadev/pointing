import { Expose, Type } from 'class-transformer';
import { GetEmployeeResponseDto } from './get-employee.dto';
import {
  IsDateString,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';

export class GetAllEmployeesQueryDto {
  @IsOptional()
  @IsDateString()
  dateCreated?: Date;

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  department?: string;
}

export class GetAllEmployeesResponseDto {
  @Expose()
  @Type(() => GetEmployeeResponseDto)
  employees: GetEmployeeResponseDto[];
}
