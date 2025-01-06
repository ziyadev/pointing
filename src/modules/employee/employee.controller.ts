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
import {
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiResponse,
} from '@nestjs/swagger';

@Controller('employee')
export class EmployeeController {
  constructor(private readonly employeeService: EmployeeService) {}

  @ApiOperation({ summary: 'Get all employees' })
  @ApiResponse({
    status: 200,
    description: 'The employees have been successfully retrieved.',
  })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  @ApiQuery({ type: GetAllEmployeesQueryDto })
  @Serialize(GetAllEmployeesResponseDto)
  @Get()
  async getAll(
    @Query() query: GetAllEmployeesQueryDto,
  ): Promise<GetAllEmployeesResponseDto> {
    return {
      employees: await this.employeeService.getAll(query),
    };
  }

  @ApiOperation({ summary: 'Update employee by id' })
  @ApiResponse({
    status: 200,
    description: 'The employee has been successfully updated.',
  })
  @ApiResponse({ status: 404, description: 'Employee not found.' })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  @ApiBody({ type: GetAllEmployeesQueryDto })
  @ApiParam({ name: 'id', type: 'string', required: true })
  @Serialize(UpdateEmployeeResponseDto)
  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() updateEmployeeDto: Partial<CreateEmployeeDto>,
  ): Promise<UpdateEmployeeResponseDto> {
    return this.employeeService.update(id, updateEmployeeDto);
  }

  @ApiOperation({ summary: 'Create a new employee' })
  @ApiResponse({
    status: 201,
    description: 'The employee has been successfully created.',
  })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  @ApiBody({ type: CreateEmployeeDto })
  @Serialize(CreateEmployeeResponseDto)
  @Post()
  create(
    @Body() createEmployeeDto: CreateEmployeeDto,
  ): Promise<CreateEmployeeResponseDto> {
    return this.employeeService.create(createEmployeeDto);
  }
}
