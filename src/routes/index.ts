import { Router } from 'express';
import { DataSource } from 'typeorm';
import { RedisClientType } from 'redis';

// Routes.
import { healthRoutes } from './health';
import { urlRoutes } from './url';

export const routes = (
  dataSource: DataSource,
  cache: RedisClientType
): Router => {
  const router = Router();

  router.use('/health', healthRoutes(dataSource));
  router.use('/', urlRoutes(dataSource, cache));

  return router;
};
