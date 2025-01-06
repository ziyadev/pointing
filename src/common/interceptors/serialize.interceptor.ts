import {
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  Injectable,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ClassConstructor, plainToClass } from 'class-transformer';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { SERIALIZE_KEY } from '../constants/serialize.constant';

@Injectable()
export class SerializeInterceptor implements NestInterceptor {
  constructor(private reflector: Reflector) {}
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const SerializeClass = this.reflector.get(
      SERIALIZE_KEY,
      context.getHandler(),
    );
    // If no metadata is found, return the data unmodified
    if (!SerializeClass) {
      return next.handle();
    }

    return next.handle().pipe(
      map((data: ClassConstructor<typeof SerializeClass>) => {
        return plainToClass(SerializeClass, data, {
          excludeExtraneousValues: true,
          exposeUnsetFields: false,
          enableImplicitConversion: true,
        });
      }),
    );
  }
}
