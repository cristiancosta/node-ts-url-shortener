import 'express-async-errors';
import { DataSource } from 'typeorm';
import { RedisClientType } from 'redis';
import swaggerUi from 'swagger-ui-express';
import express, { Express } from 'express';

// Middlewares.
import { errorHandler } from './middlewares/error-handler';
import { swaggerBasicAuth } from './middlewares/swagger-basic-auth';

// Routes.
import { routes } from './routes';

// Swagger.
import { swaggerDoc } from './swagger';

export const createApp = (
  dataSource: DataSource,
  cache: RedisClientType
): Express => {
  const app = express();

  app.use(express.json());
  app.use(
    '/api-docs',
    swaggerBasicAuth,
    swaggerUi.serve,
    swaggerUi.setup(swaggerDoc)
  );
  app.use('/', routes(dataSource, cache));
  app.use(errorHandler);

  return app;
};
