import { applyDecorators, SetMetadata } from '@nestjs/common';
import { ClassConstructor } from 'class-transformer';
import { SERIALIZE_KEY } from '../constants/serialize.constant';

export function Serialize<T>(dto: ClassConstructor<T>) {
  return applyDecorators(SetMetadata(SERIALIZE_KEY, dto));
}
