import { DataSource } from 'typeorm';
import swaggerUi from 'swagger-ui-express';
import express, { Express } from 'express';

// Middlewares.
import { swaggerBasicAuth } from './middlewares/swagger-basic-auth';

// Routes.
import { routes } from './routes';

// Swagger.
import { swaggerDoc } from './swagger';

export const createExpressApp = (dataSource: DataSource): Express => {
  const app = express();

  app.use(express.json());
  app.use(
    '/api-docs',
    swaggerBasicAuth,
    swaggerUi.serve,
    swaggerUi.setup(swaggerDoc)
  );
  app.use('/', routes(dataSource));

  return app;
};
