import { Router } from 'express';
import { DataSource } from 'typeorm';

// Routes.
import { healthRoutes } from './health';
import { urlRoutes } from './url';

export const routes = (dataSource: DataSource): Router => {
  const router = Router();

  router.use('/health', healthRoutes(dataSource));
  router.use('/url', urlRoutes(dataSource));

  return router;
};
