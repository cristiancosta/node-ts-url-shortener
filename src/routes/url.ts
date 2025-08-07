import { Router } from 'express';
import { DataSource } from 'typeorm';

// Controllers.
import { urlController } from '../controllers/url';

export const urlRoutes = (dataSource: DataSource): Router => {
  const router = Router();

  const controller = urlController(dataSource);

  router.post('/', controller.shortenUrl);

  return router;
};
