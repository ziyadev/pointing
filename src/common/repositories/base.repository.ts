import { PrismaService } from '../modules/prisma/prisma.service';

export abstract class BaseRepository {
  constructor(protected readonly prismaService: PrismaService) {}
}
