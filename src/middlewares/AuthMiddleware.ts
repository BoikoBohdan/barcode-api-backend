import { Request, Response } from "express";
import jwt from "jsonwebtoken";

export const authMiddleware = async (req: Request, res: Response, next) => {
  const token = req.headers["authorization"];

  if (!token) {
    return res.status(401).send("Token required!");
  }

  const splitToken = token.split(" ")[1];

  jwt.verify(splitToken, process.env.SECRET, (err: Error, decoded: any) => {
    if (err) {
      return res.status(403).send("Invalid Token!");
    }
    req["userId"] = decoded.id;
    next();
  });
};
