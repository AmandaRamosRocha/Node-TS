import { Router } from 'express';
import { inject, injectable } from 'tsyringe';
import IController from '@interfaces/presentation/IController';
import IUserRoutes from '@interfaces/presentation/IUserRoutes';
import { MiddlewareType } from '@interfaces/middlewares/MiddlewareType';
import { ControllerAdapterType } from '@interfaces/middlewares/ControllerAdapterType';

@injectable()
export default class UserRoutes implements IUserRoutes {
  userCreateController: IController;
  userListController: IController;
  router: Router;
  userMiddleware: MiddlewareType;
  controllerAdapter: ControllerAdapterType;
  constructor(
    @inject('UserCreateController') userCreateController: IController,
    @inject('UserListController') userListController: IController,
    @inject('userMiddleware') userMiddleware: MiddlewareType,
    @inject('ControllerAdapter') controllerAdapter: ControllerAdapterType,
    @inject('Router') Router: Router
  ) {
    this.userCreateController = userCreateController;
    this.userListController = userListController;
    this.userMiddleware = userMiddleware;
    this.controllerAdapter = controllerAdapter;
    this.router = Router;
    this.routes();
  }

  routes(): void {
    this.router.post(
      '/customer',
      this.userMiddleware,
      this.controllerAdapter(this.userCreateController)
    );
    this.router.get('/get', this.controllerAdapter(this.userListController));
  }
}
