import { Test, TestingModule } from '@nestjs/testing';

import { PrismaModule, PrismaService } from '../../infrastructure/prisma';
import { ShortenUrlUseCase } from './shorten-url.use-case';
import { UrlEntryRepository } from './url-entry.repository';

describe('ShortenUrlUseCase', () => {
  let shortenUrlUseCase: ShortenUrlUseCase;
  let urlEntryRepository: UrlEntryRepository;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      imports: [PrismaModule],
      providers: [PrismaService, UrlEntryRepository, ShortenUrlUseCase],
    }).compile();

    shortenUrlUseCase = app.get<ShortenUrlUseCase>(ShortenUrlUseCase);
    urlEntryRepository = app.get<UrlEntryRepository>(UrlEntryRepository);
  });

  afterEach(async () => {
    await urlEntryRepository.deleteAll();
  });

  it('should create a url entry in the DB and return a shortened url given a long url', async () => {
    const testUrl = 'https://testurlshortening.com';
    const result = await shortenUrlUseCase.execute({ url: testUrl });
    const urlEntry = await urlEntryRepository.getBySlug(result.slug);

    expect(urlEntry).not.toBeNull();
    expect(result).toEqual({
      slug: expect.stringMatching(/^[0-9a-zA-Z]{3,8}$/),
      originalUrl: testUrl,
    });
  });
});
