import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';

import { PrismaModule, PrismaService } from '../../infrastructure/prisma';
import { GetOriginalUrlUseCase } from './get-original-url.use-case';
import { UrlEntryRepository } from './url-entry.repository';

describe('GetOriginalUrlUseCase', () => {
  let getOriginalUrlUseCase: GetOriginalUrlUseCase;
  let urlEntryRepository: UrlEntryRepository;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      imports: [PrismaModule],
      providers: [PrismaService, UrlEntryRepository, GetOriginalUrlUseCase],
    }).compile();

    getOriginalUrlUseCase = app.get<GetOriginalUrlUseCase>(
      GetOriginalUrlUseCase,
    );
    urlEntryRepository = app.get<UrlEntryRepository>(UrlEntryRepository);
  });

  afterEach(async () => {
    await urlEntryRepository.deleteAll();
  });

  it('should retrieve the original url given a slug', async () => {
    const testUrl = 'https://testurlretrieval.com';
    const urlEntry = await urlEntryRepository.create(testUrl);

    const result = await getOriginalUrlUseCase.execute(urlEntry.slug);
    expect(result?.originalUrl).toBe(testUrl);
  });

  it('should throw an exception if the original url cannot be retrieved', async () => {
    await expect(getOriginalUrlUseCase.execute('badslug')).rejects.toThrowError(
      NotFoundException,
    );
  });
});
