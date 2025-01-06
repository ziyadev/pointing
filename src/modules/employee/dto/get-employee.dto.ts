import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class GetEmployeeResponseDto {
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
