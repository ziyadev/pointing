import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { EmployeeRepository } from './repositories/employee.repository';
import { EmployeeEntity } from './entities/employee.entity';
import { GetAllEmployeesQueryDto } from './dto/get-all-employee.dto';

@Injectable()
export class EmployeeService {
  constructor(private readonly employeeRepository: EmployeeRepository) {}
  async create(createEmployeeDto: CreateEmployeeDto): Promise<EmployeeEntity> {
    const existingEmployee = await this.employeeRepository.findUnique({
      where: { name: createEmployeeDto.name },
    });
    if (existingEmployee) {
      throw new BadRequestException(
        `Employee with name ${createEmployeeDto.name} already exists`,
      );
    }
    try {
      const employee = await this.employeeRepository.create({
        data: createEmployeeDto,
      });
      return employee;
    } catch (error) {
      throw new InternalServerErrorException(
        `Error creating employee: ${error.message}`,
      );
    }
  }
  async update(
    id: string,
    updateEmployeeDto: Partial<CreateEmployeeDto>,
  ): Promise<EmployeeEntity> {
    // We make sure that the employee exists
    const existingEmployee = await this.findUnique(id);
    if (!existingEmployee) {
      throw new BadRequestException(`Employee with id ${id} does not exist`);
    }
    try {
      const employee = await this.employeeRepository.update({
        where: { id },
        data: updateEmployeeDto,
      });
      return employee;
    } catch (error) {
      throw new InternalServerErrorException(
        `Error updating employee: ${error.message}`,
      );
    }
  }
  async getAll(
    filter: GetAllEmployeesQueryDto,
  ): Promise<Array<EmployeeEntity>> {
    try {
      const employees = await this.employeeRepository.findMany({
        where: {
          dateCreated: {
            equals: filter.dateCreated,
          },
          department: filter.department,
        },
      });
      return employees;
    } catch (error) {
      throw new InternalServerErrorException(
        `Error getting all employees: ${error.message}`,
      );
    }
  }
  async findUnique(id: string): Promise<EmployeeEntity | undefined> {
    try {
      const employee = await this.employeeRepository.findUnique({
        where: { id },
      });
      return employee;
    } catch (error) {
      throw new InternalServerErrorException(
        `Error getting employee by id: ${error.message}`,
      );
    }
  }
}
