import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import cors from 'cors';
import { Response, Request } from 'express';
import { Server } from './server';
import { controllers } from './controllers';
import { CORS_OPTIONS } from './consts/cors';

dotenv.config();

const server = new Server({
  controllers,
  middlewares: [
    cors(),
    bodyParser.urlencoded({
      extended: true,
    }),
    bodyParser.json(),
  ],
});

server.app.use((err: Error, req: Request, res: Response, next) => {
  console.log(err);
  return res.status(500).send({
    message: 'Server Error!',
  });
});

server.listen();
