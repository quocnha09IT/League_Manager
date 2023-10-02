import { Injectable, NestMiddleware } from "@nestjs/common";
import {Request,Response, NextFunction } from "express";

@Injectable()
export class AuthSwaggerMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const token = req.headers['x-access-token'];
    if (token) {
      req.headers.authorization = `Bearer ${token}`;
    }
    next();
  }
}