import { Global, Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';

@Global() // make it global so it can be used in any module
@Module({
  providers: [PrismaService],
  exports: [PrismaService],
})
export class PrismaModule {}
