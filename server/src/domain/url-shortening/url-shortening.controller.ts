import { Body, Controller, Get, Post, Query } from '@nestjs/common';

import { GetOriginalUrlUseCase } from './get-original-url.use-case';
import { ShortenUrlInputDto } from './shorten-url.dto';
import { ShortenUrlUseCase } from './shorten-url.use-case';

@Controller('/urls')
export class UrlShorteningController {
  constructor(
    private readonly getOriginalUrlUseCase: GetOriginalUrlUseCase,
    private readonly shortenUrlUseCase: ShortenUrlUseCase,
  ) {}

  @Get('/')
  getOriginalUrl(@Query('slug') slug: string) {
    return this.getOriginalUrlUseCase.execute(slug);
  }

  @Post('/shorten')
  shortenUrl(@Body() dto: ShortenUrlInputDto) {
    return this.shortenUrlUseCase.execute(dto);
  }
}
