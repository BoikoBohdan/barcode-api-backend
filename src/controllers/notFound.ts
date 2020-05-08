import { Router, Request, Response } from "express";

class NotFoundController {
  public basePath = "/";
  private router = Router();
  constructor() {
    this.router.use("/", this.notFoundHandler);
  }
  private notFoundHandler(req: Request, res: Response) {
    res.status(404).send({
      message: "Unable to find the requested resource!",
    });
  }
}

export { NotFoundController };
