import IUser from '@interfaces/domain/IUser';
import StatusError from '@util/StatusError';
import { Request, Response } from 'express';
import userMiddleware from '.';
import userSchema from './userSchema';

describe('index', () => {
  const mRes = {} as Response;
  const mNext = jest.fn();
  const mReq = {} as Request;
  it("Should run next without parameters when validation doesn't throw", async () => {
    jest.spyOn(userSchema, 'validateAsync').mockResolvedValue({} as IUser);
    await userMiddleware(mReq, mRes, mNext);
    expect(mNext).toHaveBeenCalledWith();
  });
  it('Should run next with throwed Error when validation fails', async () => {
    const validationError = new Error();
    jest.spyOn(userSchema, 'validateAsync').mockRejectedValue(validationError);
    await userMiddleware(mReq, mRes, mNext);
    expect(mNext).toHaveBeenCalledWith(
      new StatusError(422, `${validationError}`)
    );
  });
});
