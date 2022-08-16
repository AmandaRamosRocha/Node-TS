import container from '@di/index';
import UserCreateController from './UserCreateController';
import { NextFunction, Request, Response } from 'express';
import IUser from '@interfaces/domain/IUser';
import UserCreateService from '@domain/user/services/UserCreateService';
import StatusError from '@util/StatusError';

const userMock: IUser = {} as IUser;
const req = {} as Request;
const res = {} as Response;
const next = jest.fn() as NextFunction;
beforeAll(() => {
  req.body = userMock;
  res.status = jest.fn();
  res.json = jest.fn();
});

describe('CreateController', () => {
  describe('handle', () => {
    const userCreateController = container.resolve(UserCreateController);
    const spyUserCreateService = jest.spyOn(
      UserCreateService.prototype,
      'createUser'
    );
    it('should creat user when every fields is correct', () => {
      spyUserCreateService.mockReturnValue(userMock);
      userCreateController.handle(req, res, next);
      expect(res.status).toBeCalled();
      expect(res.status).toHaveBeenCalledWith(201);
    });
    it('Should run next with error when user is incorrect', async () => {
      const error = new Error();
      spyUserCreateService.mockImplementation(() => {
        throw error;
      });
      userCreateController.handle(req, res, next);
      expect(next).toBeCalled();
      expect(next).toHaveBeenCalledWith(new StatusError(422, `${error}`));
    });
  });
});
