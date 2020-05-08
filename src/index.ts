import dotenv from "dotenv";
import bodyParser from "body-parser";
import { Server } from "./server";
import { controllers } from "./controllers";
import { Response, Request } from "express";

dotenv.config();

const server = new Server({
  controllers,
  middlewares: [
    bodyParser.urlencoded({
      extended: true,
    }),
    bodyParser.json(),
  ],
});

server.app.use((err: Error, req: Request, res: Response, next) => {
  console.log(err);
  return res.status(500).send({
    message: "Server Error!",
  });
});

server.listen();
