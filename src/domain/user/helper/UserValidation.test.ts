import IUser from '@interfaces/domain/IUser';
import IUserHelper from '@interfaces/domain/IUserHelper';
import UserValidation from './UserValidation';

const userHelper: jest.Mocked<IUserHelper> = {
  checkIfEquals: jest.fn(),
  cpfValidate: jest.fn(),
};

beforeAll(() => {
  userHelper.cpfValidate.mockReturnValue(true);
  userHelper.checkIfEquals.mockReturnValue(true);
});
describe('UserValidation', () => {
  describe('validate', () => {
    const falseMock: IUser[] = [{} as IUser];
    it('Should not throw error when all validations return true', () => {
      const userValidation = new UserValidation(userHelper);
      expect(() => userValidation.validate('', '', falseMock)).not.toThrow();
    });
    it('Should throw error when cpfValidate return false', () => {
      userHelper.cpfValidate.mockReturnValueOnce(false);
      const userValidation = new UserValidation(userHelper);
      expect(() => userValidation.validate('', '', falseMock)).toThrow();
    });
    it('Should throw error when te first checkIfEquals return false', () => {
      userHelper.checkIfEquals.mockReturnValueOnce(false);
      const userValidation = new UserValidation(userHelper);
      expect(() => userValidation.validate('', '', falseMock)).toThrow();
    });
    it('Should throw error when the second checkIfEquals return false', () => {
      userHelper.checkIfEquals.mockReturnValueOnce(true);
      userHelper.checkIfEquals.mockReturnValueOnce(false);
      const userValidation = new UserValidation(userHelper);
      expect(() => userValidation.validate('', '', falseMock)).toThrow();
    });
  });
});
