import request from 'supertest';

// Types.
import { TestContext } from './types/setup';
import { GetHealthInfoResponse } from '../../src/types/health';

// Setup.
import { buildResources, teardownResources } from './setup';

describe('Health', () => {
  let context: TestContext;

  beforeAll(async () => {
    context = await buildResources();
  }, 60_000);

  afterAll(async () => {
    if (context) {
      await teardownResources(context);
    }
  });

  describe('GET /health', () => {
    it('Should return 200 status code and with healthy status and connected database information', async () => {
      const response = await request(context.app).get('/health');
      const body = response.body as GetHealthInfoResponse;

      expect(response.status).toBe(200);
      expect(body).toHaveProperty('status');
      expect(body).toHaveProperty('dependencies');
      expect(body.dependencies).toHaveProperty('database');
      expect(body.dependencies.database).toHaveProperty('status');
      expect(body.status).toEqual('healthy');
      expect(body.dependencies.database.status).toEqual('connected');
    });

    it('Should return 200 status code and with healthy status and not-connected database information', async () => {
      await context.dataSource.destroy();
      const response = await request(context.app).get('/health');
      const body = response.body as GetHealthInfoResponse;

      expect(response.status).toBe(200);
      expect(body).toHaveProperty('status');
      expect(body).toHaveProperty('dependencies');
      expect(body.dependencies).toHaveProperty('database');
      expect(body.dependencies.database).toHaveProperty('status');
      expect(body.dependencies.database).toHaveProperty('reason');
      expect(body.status).toEqual('healthy');
      expect(body.dependencies.database.status).toEqual('not-connected');
    });
  });
});
