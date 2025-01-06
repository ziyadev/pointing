import { PrismaService } from '@/common/modules/prisma/prisma.service';
import { BaseRepository } from '@/common/repositories/base.repository';
import { Injectable } from '@nestjs/common';

@Injectable()
export class EmployeeRepository extends BaseRepository {
  constructor(private readonly prisma: PrismaService) {
    super(prisma);
  }

  get create() {
    return this.prisma.employees.create;
  }

  get delete() {
    return this.prisma.employees.delete;
  }

  get deleteMany() {
    return this.prisma.employees.deleteMany;
  }

  get findFirst() {
    return this.prisma.employees.findFirst;
  }

  get findMany() {
    return this.prisma.employees.findMany;
  }

  get findUnique() {
    return this.prisma.employees.findUnique;
  }

  get update() {
    return this.prisma.employees.update;
  }
}
