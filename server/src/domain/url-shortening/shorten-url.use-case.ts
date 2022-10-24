import { Injectable, Logger } from '@nestjs/common';

import { ShortenUrlInputDto, ShortenUrlOutputDto } from './shorten-url.dto';
import { UrlEntryRepository } from './url-entry.repository';

@Injectable()
export class ShortenUrlUseCase {
  private readonly logger = new Logger(ShortenUrlUseCase.name);

  constructor(private readonly urlEntryRepository: UrlEntryRepository) {}

  async execute({ url }: ShortenUrlInputDto): Promise<ShortenUrlOutputDto> {
    this.logger.log({ url }, `Generating slug for url`);

    const urlEntry = await this.urlEntryRepository.create(url);

    return {
      slug: urlEntry.slug,
      originalUrl: urlEntry.longUrl,
    };
  }
}
