import { AttendanceType } from '@prisma/client';
import { Expose } from 'class-transformer';
import { IsNotEmpty, IsOptional, IsString, IsUUID } from 'class-validator';

export class AttendanceCheckInDto {
  @IsNotEmpty()
  @IsString()
  @IsUUID()
  employeeId: string;

  @IsOptional()
  @IsString()
  comment: string;
}
export class AttendanceCheckInResponseDto {
  @Expose()
  id: number;

  @Expose()
  comment: string;

  @Expose()
  employeeId: string;

  @Expose()
  dateCreated: Date;

  @Expose()
  type: AttendanceType;
}
