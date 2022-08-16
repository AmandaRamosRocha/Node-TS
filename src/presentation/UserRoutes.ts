import { Router } from 'express';
import { inject, injectable } from 'tsyringe';
import IController from '@interfaces/presentation/IController';
import IUserRoutes from '@interfaces/presentation/IUserRoutes';
import { MiddlewareType } from '@interfaces/middlewares/MiddlewareType';
import { ControllerAdapterType } from '@interfaces/middlewares/ControllerAdapterType';

@injectable()
export default class UserRoutes implements IUserRoutes {
  constructor(
    @inject('UserCreateController') private userCreateController: IController,
    @inject('UserListController') private userListController: IController,
    @inject('userMiddleware') private userMiddleware: MiddlewareType,
    @inject('ControllerAdapter')
    private controllerAdapter: ControllerAdapterType,
    @inject('Router') private router: Router
  ) {
    this.routes();
  }

  public routes(): void {
    this.router.post(
      '/customer',
      this.userMiddleware,
      this.controllerAdapter(this.userCreateController)
    );
    this.router.get('/get', this.controllerAdapter(this.userListController));
  }
}
