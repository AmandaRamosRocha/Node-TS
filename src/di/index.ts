import { Router } from 'express';
import { container } from 'tsyringe';
import IController from '@interfaces/presentation/IController';
import UserCreateController from '@presentation/controllers/UserCreateController';
import UserListController from '@presentation/controllers/UserListController';
import { MiddlewareType } from '@interfaces/middlewares/MiddlewareType';
import userMiddleware from '@middlewares/userMiddleware';
import { ControllerAdapterType } from '@interfaces/middlewares/ControllerAdapterType';
import controllerAdapter from '@middlewares/controllerAdapter';
import IUserCreateService from '@interfaces/domain/IUserCreateService';
import UserCreateService from '@domain/user/services/UserCreateService';
import IUserListService from '@interfaces/domain/IUserListService';
import UserListService from '@domain/user/services/UserListService';
import IUserValidation from '@interfaces/domain/IUserValidation';
import UserValidation from '@domain/user/helper/UserValidation';
import IUserHelper from '@interfaces/domain/IUserHelper';
import UserHelper from '@domain/user/helper/UserHelper';
import IUserRepository from '@interfaces/domain/IUserRepository';
import UserRepository from '@domain/user/repository/UserRepository';

container.register<Router>('Router', { useValue: Router() });

container.registerSingleton<IController>(
  'UserCreateController',
  UserCreateController
);

container.registerSingleton<IController>(
  'UserListController',
  UserListController
);

container.register<MiddlewareType>('userMiddleware', {
  useValue: userMiddleware,
});

container.register<ControllerAdapterType>('ControllerAdapter', {
  useValue: controllerAdapter,
});

container.registerSingleton<IUserCreateService>(
  'UserCreateService',
  UserCreateService
);

container.registerSingleton<IUserListService>(
  'UserListService',
  UserListService
);

container.registerSingleton<IUserValidation>('UserValidation', UserValidation);

container.registerSingleton<IUserHelper>('UserHelper', UserHelper);

container.registerSingleton<IUserRepository>('UserRepository', UserRepository);
