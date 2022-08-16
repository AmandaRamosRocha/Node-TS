import IUser from '@interfaces/domain/IUser';
import UserRepository from './UserRepository';

describe('UserRepository', () => {
  const userRepository = new UserRepository();
  describe('create', () => {
    it('Should return entity when creating user', () => {
      const entityMock: IUser = {} as IUser;
      expect(userRepository.create(entityMock)).toStrictEqual(entityMock);
    });
  });
  describe('readAll', () => {
    it('Should return database when call the function', () => {
      const databaseMock: IUser[] = [{} as IUser];
      expect(userRepository.readAll()).toStrictEqual(databaseMock);
    });
  });
});
