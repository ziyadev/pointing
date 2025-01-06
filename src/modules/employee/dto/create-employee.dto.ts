import { Expose } from 'class-transformer';
import { IsString, IsNotEmpty } from 'class-validator';
export class CreateEmployeeDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  firstName: string;

  @IsString()
  @IsNotEmpty()
  department: string;
}

export class CreateEmployeeResponseDto {
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
