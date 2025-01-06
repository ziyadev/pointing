import { Module } from '@nestjs/common';
import { AttendanceService } from './attendance.service';
import { AttendanceController } from './attendance.controller';
import { repositories } from './repositories';
import { EmployeeModule } from '../employee/employee.module';

@Module({
  imports: [EmployeeModule],
  controllers: [AttendanceController],
  providers: [AttendanceService, ...repositories],
})
export class AttendanceModule {}
