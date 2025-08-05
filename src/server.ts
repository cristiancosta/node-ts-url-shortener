import express, { Request, Response } from 'express';

const app = express();

app.get('/', (req: Request, res: Response) => res.send({ message: 'Hello' }));

app.listen(8899, () => console.log(`Server running on port 8899`));
