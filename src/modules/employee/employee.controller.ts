import { Controller, Post, Body, Get, Put, Param, Query } from '@nestjs/common';
import { EmployeeService } from './employee.service';
import {
  CreateEmployeeDto,
  CreateEmployeeResponseDto,
} from './dto/create-employee.dto';
import { Serialize } from '@/common/decorators/serialize.decorator';
import { UpdateEmployeeResponseDto } from './dto/update-employee.dto';
import {
  GetAllEmployeesQueryDto,
  GetAllEmployeesResponseDto,
} from './dto/get-all-employee.dto';

@Controller('employee')
export class EmployeeController {
  constructor(private readonly employeeService: EmployeeService) {}

  @Serialize(GetAllEmployeesResponseDto)
  @Get()
  async getAll(
    @Query() query: GetAllEmployeesQueryDto,
  ): Promise<GetAllEmployeesResponseDto> {
    return {
      employees: await this.employeeService.getAll(query),
    };
  }

  @Serialize(UpdateEmployeeResponseDto)
  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() updateEmployeeDto: Partial<CreateEmployeeDto>,
  ): Promise<UpdateEmployeeResponseDto> {
    return this.employeeService.update(id, updateEmployeeDto);
  }

  @Serialize(CreateEmployeeResponseDto)
  @Post()
  create(
    @Body() createEmployeeDto: CreateEmployeeDto,
  ): Promise<CreateEmployeeResponseDto> {
    return this.employeeService.create(createEmployeeDto);
  }
}
