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
import { ApiBody, ApiResponse } from '@nestjs/swagger';

@Controller('attendance')
export class AttendanceController {
  constructor(private readonly attendanceService: AttendanceService) {}

  @ApiResponse({
    status: 201,
    description: 'The attendance has been successfully created.',
  })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  @ApiBody({ type: AttendanceCheckInDto })
  @Serialize(AttendanceCheckInResponseDto)
  @Post('check-in')
  checkIn(
    @Body() attendanceCheckInDto: AttendanceCheckInDto,
  ): Promise<AttendanceCheckInResponseDto> {
    return this.attendanceService.checkIn(attendanceCheckInDto);
  }
  @ApiResponse({
    status: 201,
    description: 'The attendance has been successfully created.',
  })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  @ApiBody({ type: AttendanceCheckOutDto })
  @Serialize(AttendanceCheckOutResponseDto)
  @Post('check-out')
  checkOut(
    @Body() attendanceCheckOutDto: AttendanceCheckOutDto,
  ): Promise<AttendanceCheckOutResponseDto> {
    return this.attendanceService.checkOut(attendanceCheckOutDto);
  }
}
