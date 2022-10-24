import { Injectable } from '@nestjs/common';
import { UrlEntry } from '@prisma/client';

import { fromBase62, toBase62 } from '../../common/base62-conversion';
import { PrismaService } from '../../infrastructure/prisma';

type UrlEntryWithSlug = UrlEntry & { slug: string };

@Injectable()
export class UrlEntryRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(longUrl: string): Promise<UrlEntryWithSlug> {
    const urlEntry = await this.prisma.urlEntry.create({ data: { longUrl } });

    return { ...urlEntry, slug: toBase62(urlEntry.id) };
  }

  async getBySlug(slug: string): Promise<UrlEntryWithSlug | null> {
    const urlEntry = await this.prisma.urlEntry.findUnique({
      where: { id: fromBase62(slug) },
    });

    if (!urlEntry) {
      return null;
    }

    return { ...urlEntry, slug: toBase62(urlEntry.id) };
  }

  async deleteAll() {
    return await this.prisma.urlEntry.deleteMany({});
  }
}
