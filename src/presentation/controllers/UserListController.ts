import { NextFunction, Request, Response } from 'express';
import { inject, injectable } from 'tsyringe';
import IController from '@interfaces/presentation/IController';
import IUserListService from '@interfaces/domain/IUserListService';
import StatusError from '@util/StatusError';

@injectable()
export default class UserListController implements IController {
  constructor(
    @inject('UserListService') private userListService: IUserListService
  ) {}

  public handle(
    req: Request,
    res: Response,
    next: NextFunction
  ): Response | void {
    try {
      const listUser = this.userListService.userList();
      return res.json(listUser).status(200);
    } catch (error) {
      next(new StatusError(500, `${error}`));
    }
  }
}
