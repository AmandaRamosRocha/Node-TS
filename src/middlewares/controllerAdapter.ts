import { NextFunction, Request, Response } from 'express';
import IController from '@interfaces/presentation/IController';

export default function controllerAdapter(controller: IController) {
  return (req: Request, res: Response, next: NextFunction) =>
    controller.handle(req, res, next);
}
