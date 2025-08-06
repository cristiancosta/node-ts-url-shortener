import swaggerUi from 'swagger-ui-express';
import express, { Request, Response } from 'express';

// Configuration.
import { configuration } from './configuration';
import { swaggerDoc } from './swagger';
import { swaggerBasicAuth } from './middlewares/swagger-basic-auth';

// DataSource.
import { createDataSource } from './data-source';

const { db } = configuration;

const app = express();

createDataSource(db)
  .initialize()
  .then(() => {
    const { port } = configuration.server;
    app.use(
      '/api-docs',
      swaggerBasicAuth,
      swaggerUi.serve,
      swaggerUi.setup(swaggerDoc)
    );
    app.get('/', (req: Request, res: Response) =>
      res.send({ message: 'Hello' })
    );
    app.listen(port, () => console.log(`Server running on port ${port}`));
    console.log('Server connected to database');
  })
  .catch((error) =>
    console.log(
      `Server unable to connect to database: ${JSON.stringify(error)}`
    )
  );
