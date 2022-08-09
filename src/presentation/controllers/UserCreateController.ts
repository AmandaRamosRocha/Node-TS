import { NextFunction, Request, Response } from 'express';
import { inject, injectable } from 'tsyringe';
import IController from '@interfaces/presentation/IController';
import IUserCreateService from '@interfaces/domain/IUserCreateService';
import StatusError from '@util/StatusError';

@injectable()
export default class UserCreateController implements IController {
  userCreateService: IUserCreateService;
  constructor(
    @inject('UserCreateService') userCreateService: IUserCreateService
  ) {
    this.userCreateService = userCreateService;
  }

  public handle(
    req: Request,
    res: Response,
    next: NextFunction
  ): Response | void {
    try {
      const newUser = this.userCreateService.createUser(req.body);
      return res.status(201).json(newUser);
    } catch (error) {
      next(new StatusError(422, `${error}`));
    }
  }
}
