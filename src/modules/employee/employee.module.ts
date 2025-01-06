import { Module } from '@nestjs/common';
import { EmployeeService } from './employee.service';
import { EmployeeController } from './employee.controller';
import { repositories } from './repositories';

@Module({
  controllers: [EmployeeController],
  providers: [EmployeeService, ...repositories],
  exports: [EmployeeService],
})
export class EmployeeModule {}
