import { Injectable, Logger, NotFoundException } from '@nestjs/common';

import { GetOriginalUrlOutputDto } from './get-original-url.dto';
import { UrlEntryRepository } from './url-entry.repository';

@Injectable()
export class GetOriginalUrlUseCase {
  private readonly logger = new Logger(GetOriginalUrlUseCase.name);

  constructor(private readonly urlEntryRepository: UrlEntryRepository) {}

  async execute(slug: string): Promise<GetOriginalUrlOutputDto | undefined> {
    this.logger.log({ slug }, `Fetching original url for slug`);

    const urlEntry = await this.urlEntryRepository.getBySlug(slug);

    if (!urlEntry) {
      throw new NotFoundException(
        `Could not find original URL for slug ${slug}`,
      );
    }

    return { originalUrl: urlEntry.longUrl };
  }
}
