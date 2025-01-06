import {
  IsIn,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';
import { AttendanceType } from '@prisma/client';

export class CreateAttendanceDto {
  @IsNotEmpty()
  @IsString()
  @IsUUID()
  employeeId: string;

  @IsOptional()
  @IsString()
  comment: string;

  @IsNotEmpty()
  @IsString()
  @IsIn([AttendanceType.checkIn, AttendanceType.checkOut])
  type: AttendanceType;
}
