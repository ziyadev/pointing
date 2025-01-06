import { Controller, Post, Body } from '@nestjs/common';
import { AttendanceService } from './attendance.service';
import {
  AttendanceCheckOutDto,
  AttendanceCheckOutResponseDto,
} from './dto/attendance-checkout.dto';
import {
  AttendanceCheckInDto,
  AttendanceCheckInResponseDto,
} from './dto/attendance-checkin.dto';
import { Serialize } from '@/common/decorators/serialize.decorator';

@Controller('attendance')
export class AttendanceController {
  constructor(private readonly attendanceService: AttendanceService) {}

  @Serialize(AttendanceCheckInResponseDto)
  @Post('check-in')
  checkIn(
    @Body() attendanceCheckInDto: AttendanceCheckInDto,
  ): Promise<AttendanceCheckInResponseDto> {
    return this.attendanceService.checkIn(attendanceCheckInDto);
  }
  @Serialize(AttendanceCheckOutResponseDto)
  @Post('check-out')
  checkOut(
    @Body() attendanceCheckOutDto: AttendanceCheckOutDto,
  ): Promise<AttendanceCheckOutResponseDto> {
    return this.attendanceService.checkOut(attendanceCheckOutDto);
  }
}
