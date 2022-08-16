import container from '@di/index';
import UserListController from './UserListController';
import { NextFunction, Request, Response } from 'express';
import IUser from '@interfaces/domain/IUser';
import StatusError from '@util/StatusError';
import UserListService from '@domain/user/services/UserListService';

const req = {} as Request;
const res = {} as Response;
const next = jest.fn() as NextFunction;
const userMock: IUser[] = [{} as IUser];
beforeAll(() => {
  req.body = userMock;
  res.status = jest.fn().mockImplementation(() => res);
  res.json = jest.fn().mockImplementation(() => res);
});

describe('UserListController', () => {
  describe('handle', () => {
    const userListController = container.resolve(UserListController);
    const spyUserListService = jest.spyOn(
      UserListService.prototype,
      'listUser'
    );
    it('Should create user when all fields are correctttttt', () => {
      spyUserListService.mockReturnValue(userMock);
      userListController.handle(req, res, next);
      expect(res.json).toBeCalledWith(userMock);
      expect(res.status).toBeCalledWith(200);
    });
    it('Should throw error', () => {
      const error = new Error();
      spyUserListService.mockImplementation(() => {
        throw error;
      });
      userListController.handle(req, res, next);
      expect(next).toBeCalledWith(new StatusError(500, `${error}`));
    });
  });
});
