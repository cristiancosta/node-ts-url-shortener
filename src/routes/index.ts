import { Router } from 'express';
import { DataSource } from 'typeorm';

// Routes.
import { healthRoutes } from './health';

export const routes = (dataSource: DataSource): Router => {
  const router = Router();

  router.use('/health', healthRoutes(dataSource));

  return router;
};
