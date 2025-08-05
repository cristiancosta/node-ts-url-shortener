import swaggerUi from 'swagger-ui-express';
import express, { Request, Response } from 'express';

// Configuration.
import { configuration } from './configuration';
import { swaggerDoc } from './swagger';

const { port } = configuration.server;

const app = express();

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDoc));
app.get('/', (req: Request, res: Response) => res.send({ message: 'Hello' }));

app.listen(port, () => console.log(`Server running on port ${port}`));
