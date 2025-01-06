import { ApiProperty } from '@nestjs/swagger';
import { AttendanceType } from '@prisma/client';
import { Expose } from 'class-transformer';
import { IsNotEmpty, IsOptional, IsString, IsUUID } from 'class-validator';

export class AttendanceCheckInDto {
  @ApiProperty({ description: "Employee's unique identifier", required: true })
  @IsNotEmpty()
  @IsString()
  @IsUUID()
  employeeId: string;

  @ApiProperty({ description: 'Comment about the check-in', required: false })
  @IsOptional()
  @IsString()
  comment: string;
}
export class AttendanceCheckInResponseDto {
  @ApiProperty({ description: 'Unique identifier of the check-in' })
  @Expose()
  id: number;

  @ApiProperty({ description: 'Comment about the check-in' })
  @Expose()
  comment: string;

  @ApiProperty({ description: 'Unique identifier of the employee' })
  @Expose()
  employeeId: string;

  @ApiProperty({ description: 'Date of creation of the check-in' })
  @Expose()
  dateCreated: Date;

  @ApiProperty({ description: 'Type of the check-in' })
  @Expose()
  type: AttendanceType;
}
