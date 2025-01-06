import {
  IsIn,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';
import { AttendanceType } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';

export class CreateAttendanceDto {
  @ApiProperty({ description: "Employee's unique identifier", required: true })
  @IsNotEmpty()
  @IsString()
  @IsUUID()
  employeeId: string;

  @ApiProperty({ description: 'Comment about the attendance', required: false })
  @IsOptional()
  @IsString()
  comment: string;

  @ApiProperty({ description: 'Type of the attendance', required: true })
  @IsNotEmpty()
  @IsString()
  @IsIn([AttendanceType.checkIn, AttendanceType.checkOut])
  type: AttendanceType;
}
