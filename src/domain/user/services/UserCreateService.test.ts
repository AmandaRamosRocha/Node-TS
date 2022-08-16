import UserCreateService from './UserCreateService';
import UserValidation from '../helper/UserValidation';
import UserRepository from '../repository/UserRepository';
import IUser from '@interfaces/domain/IUser';
import container from '@di/index';

describe('UserCreateService', () => {
  describe('createUser', () => {
    const newUser: IUser = {} as IUser;
    const userCreateService = container.resolve(UserCreateService);
    const spyRepository = jest
      .spyOn(UserRepository.prototype, 'create')
      .mockReturnValue(newUser);
    it('Should not throw error when every data is correct', () => {
      const spyValidation = jest
        .spyOn(UserValidation.prototype, 'validate')
        .mockReturnValue();

      expect(userCreateService.createUser(newUser)).toBe(newUser);
      expect(spyValidation).toBeCalledWith(newUser.cpf, newUser.email, []);
      expect(spyRepository).toBeCalledWith(newUser);
    });
    it('Should throw error when validate failed', async () => {
      const mockError = new Error('Some Error');
      jest
        .spyOn(UserValidation.prototype, 'validate')
        .mockImplementation(() => {
          throw mockError;
        });
      try {
        await userCreateService.createUser(newUser);
      } catch (error) {
        expect(error).toBe(mockError);
      }
    });
  });
});
