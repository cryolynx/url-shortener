import { ApiProperty } from '@nestjs/swagger';

export class ShortenUrlInputDto {
  @ApiProperty()
  url!: string;
}

export class ShortenUrlOutputDto {
  @ApiProperty()
  slug!: string;

  @ApiProperty()
  originalUrl!: string;
}
