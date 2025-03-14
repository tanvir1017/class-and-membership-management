import { NextFunction, Request, Response } from "express";
import { allowedOrigins } from "../config/allowedOrigin";

const credentials = (req: Request, res: Response, next: NextFunction): void => {
  const origin = req.headers.origin;

  if (origin && allowedOrigins.includes(origin)) {
    res.header("Access-Control-Allow-Credentials", "true");
  }

  next();
};

export default credentials;
