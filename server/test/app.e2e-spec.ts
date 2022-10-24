import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';

import { AppModule } from './../src/app.module';

describe('App (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  describe('/urls/shorten', () => {
    it('returns 201 and slug in the response body', () => {
      const urlToShorten = 'https://urltoshorten.com';

      return request(app.getHttpServer())
        .post('/urls/shorten')
        .send({ url: urlToShorten })
        .expect(201)
        .expect((res) => {
          expect(res.body).toEqual({
            slug: expect.stringMatching(/^[0-9a-zA-Z]{3,8}$/),
            originalUrl: urlToShorten,
          });
        });
    });
  });

  describe('/urls', () => {
    it('returns 404 when slug does not resolve to a URL', () => {
      return request(app.getHttpServer()).get('/urls?slug=123').expect(404);
    });
  });
});
