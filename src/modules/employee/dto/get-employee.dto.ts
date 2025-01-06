import { Expose } from 'class-transformer';

export class GetEmployeeResponseDto {
  @Expose()
  id: string;

  @Expose()
  name: string;

  @Expose()
  firstName: string;

  @Expose()
  dateCreated: Date;

  @Expose()
  department: string;
}
