/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextFunction, Request, Response } from 'express';
import IStatusError from '@interfaces/util/IStatusError';

export default async function errorMiddleware(
  err: IStatusError,
  req: Request,
  res: Response,
  next: NextFunction
) {
  res.status(err.code).json(err.message);
}
