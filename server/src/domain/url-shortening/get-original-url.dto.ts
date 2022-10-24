import { ApiProperty } from '@nestjs/swagger';

export class GetOriginalUrlOutputDto {
  @ApiProperty()
  originalUrl!: string;
}
