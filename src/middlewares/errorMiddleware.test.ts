import StatusError from '@util/StatusError';
import { NextFunction, Request, Response } from 'express';
import errorMiddleware from './errorMiddleware';

const req = {} as Request;
const res = {} as Response;
const next = jest.fn() as NextFunction;
const statusError = new StatusError(404, '');

beforeAll(() => {
  res.status = jest.fn().mockImplementation(() => res);
  res.json = jest.fn().mockImplementation(() => res);
});

describe('errorMiddleware', () => {
  it('Should send error as json with StatusError status code', () => {
    errorMiddleware(statusError, req, res, next);
    expect(res.status).toBeCalledWith(statusError.code);
    expect(res.json).toBeCalledWith(statusError.message);
  });
});
