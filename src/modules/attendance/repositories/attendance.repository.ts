import { PrismaService } from '@/common/modules/prisma/prisma.service';
import { BaseRepository } from '@/common/repositories/base.repository';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AttendanceRepository extends BaseRepository {
  constructor(private readonly prisma: PrismaService) {
    super(prisma); // pass the prisma service to the base repository
  }

  get create() {
    return this.prisma.attendances.create;
  }

  get delete() {
    return this.prisma.attendances.delete;
  }

  get deleteMany() {
    return this.prisma.attendances.deleteMany;
  }

  get findFirst() {
    return this.prisma.attendances.findFirst;
  }

  get findMany() {
    return this.prisma.attendances.findMany;
  }

  get findUnique() {
    return this.prisma.attendances.findUnique;
  }

  get update() {
    return this.prisma.attendances.update;
  }
}
