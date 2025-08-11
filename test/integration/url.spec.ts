import request from 'supertest';
import { Repository } from 'typeorm';

// Configuration.
import { configuration } from '../../src/configuration';

// Models.
import { Url } from '../../src/models/url';

// Utils.
import { encodeBase62 } from '../../src/utils/base62';

// Types.
import { TestContext } from './types/setup';
import { ShortenUrlOutputDto } from '../../src/types/url';

// Setup.
import { buildResources, teardownResources } from './setup';

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
    let urlRepository: Repository<Url>;

    beforeEach(async () => {
      urlRepository = context.database.dataSource.getRepository(Url);
      await urlRepository.save({
        id: 1,
        url: 'https://github.com/cristiancosta/node-ts-url-shortener'
      });
    });

    afterEach(async () => {
      await urlRepository.clear();
    });

    it('Should return 200 with 1 as short url since already exist on database', async () => {
      const response = await request(context.app).post('/shorten').send({
        url: 'https://github.com/cristiancosta/node-ts-url-shortener'
      });

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('shortUrl');

      const { shortUrl } = response.body as ShortenUrlOutputDto;
      const { host, port } = configuration.server;
      expect(shortUrl).toBe(`${host}:${port}/1`);
    });

    it('Should return 200 with 2 as short url since it does not exist on database', async () => {
      const response = await request(context.app).post('/shorten').send({
        url: 'https://github.com/cristiancosta/node-ts-jwt'
      });

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('shortUrl');
      const { shortUrl } = response.body as ShortenUrlOutputDto;
      const { host, port } = configuration.server;
      expect(shortUrl).toBe(`${host}:${port}/2`);

      const dbUrl = await urlRepository.findOne({
        where: { id: Number(shortUrl.split('/')[1]) }
      });
      expect(dbUrl?.url).toEqual(
        'https://github.com/cristiancosta/node-ts-jwt'
      );
    });
  });

  describe('GET /:encodedId', () => {
    let urlRepository: Repository<Url>;

    beforeEach(async () => {
      urlRepository = context.database.dataSource.getRepository(Url);
      await urlRepository.save({
        id: 414,
        url: 'https://github.com/cristiancosta/node-ts-url-shortener'
      });
    });

    afterEach(async () => {
      await urlRepository.clear();
    });

    it('Should return 404', async () => {
      const response = await request(context.app).get(`/${encodeBase62(1)}`);

      expect(response.status).toBe(404);
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      expect(response.body.message).toBe('URL_NOT_FOUND');
    });

    it('Should return 302', async () => {
      const response = await request(context.app).get(`/${encodeBase62(414)}`);

      expect(response.status).toBe(302);
    });
  });
});
