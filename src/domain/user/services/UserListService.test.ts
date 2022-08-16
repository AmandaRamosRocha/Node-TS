import container from '@di/index';
import UserListService from './UserListService';
import UserRepository from '../repository/UserRepository';
import IUser from '@interfaces/domain/IUser';

describe('UserListService', () => {
  describe('userList', () => {
    const userListService = container.resolve(UserListService);
    const result: IUser[] = [] as IUser[];
    it('Should return all users in database when call the function', () => {
      jest.spyOn(UserRepository.prototype, 'readAll').mockReturnValue(result);
      expect(userListService.userList()).toStrictEqual(result);
    });
  });
});
