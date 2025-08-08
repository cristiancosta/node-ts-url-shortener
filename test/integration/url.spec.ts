import request from 'supertest';

// Types.
import { TestContext } from './types/setup';

// Setup.
import { buildResources, teardownResources } from './setup';
// import { encode } from '../../src/utils/base62';

describe('Url', () => {
  let context: TestContext;

  beforeAll(async () => {
    context = await buildResources();
  }, 60_000);

  afterAll(async () => {
    if (context) {
      await teardownResources(context);
    }
  });

  describe('POST /shorten', () => {
    it('Should return 200', async () => {
      const response = await request(context.app)
        .post('/shorten')
        .send({
          longUrl: 'https://github.com/cristiancosta/node-ts-url-shortener'
        });

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('shortUrl');
    });
  });

  // describe('GET /:encodedId', () => {
  //   it('Should return 302', async () => {
  //     const response = await request(context.app)
  //       .get(`/${encode(1)}`);

  //     expect(response.status).toBe(302);
  //   });
  // });
});
