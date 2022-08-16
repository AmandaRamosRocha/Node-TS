import { NextFunction, Request, Response } from 'express';
import StatusError from '@util/StatusError';
import userSchema from './userSchema';

export default async function (
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const validateBody = await userSchema.validateAsync(req.body);
    req.body = validateBody;
    next();
  } catch (error) {
    next(new StatusError(422, `${error}`));
  }
}
