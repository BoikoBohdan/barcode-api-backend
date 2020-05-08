import express from 'express';
import mongoose from 'mongoose';
import { authMiddleware } from './middlewares';

class Server {
  public app = express();

  constructor({ controllers, middlewares }) {
    this.connectionToServer();
    this.setupMiddlewares(middlewares);
    this.setupController(controllers);
  }

  private connectionToServer() {
    mongoose.connect(
      `mongodb://${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`,
      { useNewUrlParser: true },
      () => {
        console.log('Successfully connected to db!');
      }
    );
  }

  private setupMiddlewares(middlewares) {
    middlewares.forEach((middleware: any) => {
      this.app.use(middleware);
    });
  }

  private setupController(controllers) {
    controllers.forEach((controller: any) => {
      if (controller.requireAuth) {
        this.app.use(controller.basePath, authMiddleware, controller.router);
      } else {
        this.app.use(controller.basePath, controller.router);
      }
    });
  }

  public listen() {
    this.app.listen(process.env.PORT, () => {
      console.log('Server started at port ', process.env.PORT);
    });
  }
}

export { Server };
