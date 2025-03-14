// Middleware For Data Sanitization

import { NextFunction, Request, Response } from "express";
import { AnyZodObject } from "zod";
import asyncHandler from "../utils/asyncHandler";

const sanitizeClientDataViaZod = (schema: AnyZodObject) =>
  asyncHandler(async (req: Request, __res: Response, next: NextFunction) => {
    await schema.parseAsync({
      body: req.body,
      cookies: req.cookies,
    });
    next();
  });

export default sanitizeClientDataViaZod;
