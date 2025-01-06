import { Employees } from '@prisma/client';

export class EmployeeEntity implements Employees {
  id: string;
  name: string;
  firstName: string;
  dateCreated: Date;
  department: string;
}
