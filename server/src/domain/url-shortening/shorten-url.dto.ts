import { ApiProperty } from '@nestjs/swagger';
import { createZodDto } from 'nestjs-zod';
import { z } from 'nestjs-zod/z';

const ShortenUrlInputSchema = z.object({
  url: z.string().url(),
});

export class ShortenUrlInputDto extends createZodDto(ShortenUrlInputSchema) {}

export class ShortenUrlOutputDto {
  @ApiProperty()
  slug!: string;

  @ApiProperty()
  originalUrl!: string;
}
