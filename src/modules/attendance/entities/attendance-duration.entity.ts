import { AttendancesDuration } from '@prisma/client';

export class AttendanceEntity implements AttendancesDuration {
  id: number;
  employeeId: string;
  duration: number;
  dateCreated: Date;
  checkInId: number;
  checkOutId: number;
}
