import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { IsString, IsNotEmpty } from 'class-validator';
export class CreateEmployeeDto {
  @ApiProperty({
    description: 'Name of the employee, must be unique',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ description: 'First name of the employee', required: true })
  @IsString()
  @IsNotEmpty()
  firstName: string;

  @ApiProperty({ description: 'Department of the employee', required: true })
  @IsString()
  @IsNotEmpty()
  department: string;
}

export class CreateEmployeeResponseDto {
  @ApiProperty({ description: 'Unique identifier of the employee' })
  @Expose()
  id: string;

  @ApiProperty({ description: 'Name of the employee' })
  @Expose()
  name: string;

  @ApiProperty({ description: 'First name of the employee' })
  @Expose()
  firstName: string;

  @ApiProperty({ description: 'Date of creation of the employee' })
  @Expose()
  dateCreated: Date;

  @ApiProperty({ description: 'Department of the employee' })
  @Expose()
  department: string;
}
