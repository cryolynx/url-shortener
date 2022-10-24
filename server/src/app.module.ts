import { Module } from '@nestjs/common';
import { LoggerModule } from 'nestjs-pino';

import { UrlShorteningModule } from './domain/url-shortening/url-shortening.module';
import { PrismaModule } from './infrastructure/prisma';

@Module({
  imports: [
    LoggerModule.forRoot({
      pinoHttp: {
        customProps: () => ({
          context: 'HTTP',
        }),
        transport: {
          target: 'pino-pretty',
          options: {
            singleLine: true,
          },
        },
      },
    }),
    PrismaModule,
    UrlShorteningModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
