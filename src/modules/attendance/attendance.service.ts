import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { AttendanceCheckInDto } from './dto/attendance-checkin.dto';
import { AttendanceCheckOutDto } from './dto/attendance-checkout.dto';
import { EmployeeService } from '../employee/employee.service';
import { CreateAttendanceDto } from './dto/create-attendance.dto';
import { AttendanceRepository } from './repositories/attendance.repository';
import { AttendanceType } from '@prisma/client';
import { AttendancesDurationRepository } from './repositories/attendances-duration.repository';
import { Duration } from 'luxon';
import { AttendanceEntity } from './entities/attendance.entity';
@Injectable()
export class AttendanceService {
  private readonly logger = new Logger(AttendanceService.name);
  constructor(
    private readonly employeeService: EmployeeService,
    private readonly attendanceRepository: AttendanceRepository,
    private readonly attendancesDurationRepository: AttendancesDurationRepository,
  ) {}
  /**
   * Creates a checkIn attendance for an employee
   * @param attendanceCheckInDto
   * @returns Attendance entity
   */
  async checkIn(
    attendanceCheckInDto: AttendanceCheckInDto,
  ): Promise<AttendanceEntity> {
    try {
      // Create the checkIn attendance
      const checkInAttendance = await this.create({
        employeeId: attendanceCheckInDto.employeeId,
        type: AttendanceType.checkIn, // make the type as checkIn
        comment: attendanceCheckInDto.comment,
      });
      return checkInAttendance;
    } catch (error) {
      throw new InternalServerErrorException(
        `Error creating checkIn attendance: ${error.message}`,
      );
    }
  }
  /**
   * Creates a checkOut attendance for an employee and calculates the duration of the attendance
   * then saves the duration in the database
   * @param attendanceCheckOutDto
   * @returns Attendance entity
   */
  async checkOut(
    attendanceCheckOutDto: AttendanceCheckOutDto,
  ): Promise<AttendanceEntity> {
    // we make sure that the employee has a checkIn attendance
    const checkInAttendance = await this.attendanceRepository.findFirst({
      where: {
        employeeId: attendanceCheckOutDto.employeeId, // filter by employeeId
        type: AttendanceType.checkIn, // we make sure that the type is checkIn
      },
      orderBy: {
        dateCreated: 'desc',
      },
    });
    // If there is no checkIn attendance, throw an error
    if (!checkInAttendance) {
      throw new BadRequestException(
        `Employee with id ${attendanceCheckOutDto.employeeId} has no checkIn attendance`,
      );
    }
    try {
      // Create the checkOut attendance
      const checkOutAttendance = await this.create({
        employeeId: attendanceCheckOutDto.employeeId,
        type: AttendanceType.checkOut, // make the type as checkOut
        comment: attendanceCheckOutDto.comment,
      });
      // Calculate the duration of the attendance
      const duration = await this.calculateAttendanceDuration(
        checkInAttendance.dateCreated,
        checkOutAttendance.dateCreated,
      );
      try {
        // Save the duration in the database
        await this.attendancesDurationRepository.create({
          data: {
            employeeId: attendanceCheckOutDto.employeeId,
            checkInId: checkInAttendance.id,
            checkOutId: checkOutAttendance.id,
            duration,
          },
        });
        this.logger.log(
          `Employee ${attendanceCheckOutDto.employeeId} checked out with duration ${Duration.fromMillis(duration).hours} hours`,
        );
      } catch (error) {
        this.logger.error(`Error saving attendance duration: ${error.message}`);
      }
      return checkOutAttendance;
    } catch (error) {
      throw new InternalServerErrorException(
        `Error creating checkOut attendance: ${error.message}`,
      );
    }
  }
  async create(
    createAttendanceDto: CreateAttendanceDto,
  ): Promise<AttendanceEntity> {
    // We make sure that the employee exists
    const employee = await this.employeeService.findUnique(
      createAttendanceDto.employeeId,
    );
    if (!employee) {
      throw new NotFoundException(
        `Employee with id ${createAttendanceDto.employeeId} not found`,
      );
    }
    try {
      const attendance = await this.attendanceRepository.create({
        data: {
          type: createAttendanceDto.type,
          comment: createAttendanceDto.comment,
          employeeId: employee.id,
        },
      });
      return attendance;
    } catch (error) {
      throw new InternalServerErrorException(
        `Error creating attendance: ${error.message}`,
      );
    }
  }
  /**
   * Calculates the duration of an attendance
   * @param checkInTimeStamp
   * @param checkOutTimeStamp
   * @returns  Duration in milliseconds
   */
  calculateAttendanceDuration(
    checkInTimeStamp: Date,
    checkOutTimeStamp: Date,
  ): number {
    try {
      const durationInMilliseconds =
        checkOutTimeStamp.getTime() - checkInTimeStamp.getTime();
      return durationInMilliseconds;
    } catch (error) {
      throw new InternalServerErrorException(
        `Error calculating attendance duration: ${error.message}`,
      );
    }
  }
}
