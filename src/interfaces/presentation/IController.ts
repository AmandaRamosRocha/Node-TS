import { NextFunction, Request, Response } from 'express';

export default interface IController {
  handle(req: Request, res: Response, next: NextFunction): Response | void;
}
