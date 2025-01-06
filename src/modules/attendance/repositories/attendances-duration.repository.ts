import { PrismaService } from '@/common/modules/prisma/prisma.service';
import { BaseRepository } from '@/common/repositories/base.repository';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AttendancesDurationRepository extends BaseRepository {
  constructor(private readonly prisma: PrismaService) {
    super(prisma); // pass the prisma service to the base repository
  }

  get create() {
    return this.prisma.attendancesDuration.create;
  }

  get delete() {
    return this.prisma.attendancesDuration.delete;
  }

  get deleteMany() {
    return this.prisma.attendancesDuration.deleteMany;
  }

  get findFirst() {
    return this.prisma.attendancesDuration.findFirst;
  }

  get findMany() {
    return this.prisma.attendancesDuration.findMany;
  }

  get findUnique() {
    return this.prisma.attendancesDuration.findUnique;
  }

  get update() {
    return this.prisma.attendancesDuration.update;
  }
}
