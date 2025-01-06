import { Attendances, AttendanceType } from '@prisma/client';

export class AttendanceEntity implements Attendances {
  id: number;
  comment: string;
  employeeId: string;
  dateCreated: Date;
  type: AttendanceType;
}
