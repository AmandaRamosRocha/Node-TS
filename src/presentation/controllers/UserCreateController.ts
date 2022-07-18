import { Request, Response } from 'express';
import { inject, injectable } from 'tsyringe';
import IUserCreateController from '../../interfaces/presentation/IUserCreateController';
import IUserCreateService from '../../interfaces/domain/IUserCreateService';

@injectable()
export default class UserCreateController implements IUserCreateController {
  userCreateService: IUserCreateService;
  constructor(
    @inject('UserCreateService') userCreateService: IUserCreateService
  ) {
    this.userCreateService = userCreateService;
  }

  handle = (req: Request, res: Response): void => {
    const createUser = this.userCreateService.createUser(req.body);
    res.status(createUser.code).json(createUser.message);
  };
}