import express, { Express, Request, Response } from 'express';
import swaggerUi from 'swagger-ui-express';

// Middlewares.
import { swaggerBasicAuth } from './middlewares/swagger-basic-auth';

// Swagger.
import { swaggerDoc } from './swagger';

export const createExpressApp = (): Express => {
  const app = express();

  app.use(
    '/api-docs',
    swaggerBasicAuth,
    swaggerUi.serve,
    swaggerUi.setup(swaggerDoc)
  );
  app.get('/', (req: Request, res: Response) => res.send({ message: 'Hello' }));

  return app;
};
