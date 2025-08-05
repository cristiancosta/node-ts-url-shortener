import express, { Request, Response } from 'express';

// Configuration.
import { configuration } from './configuration';

const { port } = configuration.server;

const app = express();

app.get('/', (req: Request, res: Response) => res.send({ message: 'Hello' }));

app.listen(port, () => console.log(`Server running on port ${port}`));
