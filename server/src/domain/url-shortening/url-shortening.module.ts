import { Module } from '@nestjs/common';

import { PrismaModule, PrismaService } from '../../infrastructure/prisma';
import { GetOriginalUrlUseCase } from './get-original-url.use-case';
import { ShortenUrlUseCase } from './shorten-url.use-case';
import { UrlEntryRepository } from './url-entry.repository';
import { UrlShorteningController } from './url-shortening.controller';

@Module({
  imports: [PrismaModule],
  controllers: [UrlShorteningController],
  providers: [
    PrismaService,
    UrlEntryRepository,
    GetOriginalUrlUseCase,
    ShortenUrlUseCase,
  ],
})
export class UrlShorteningModule {}
