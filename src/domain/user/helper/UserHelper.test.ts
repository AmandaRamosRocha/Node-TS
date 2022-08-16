import IUser from '@interfaces/domain/IUser';
import UserHelper from './UserHelper';
import container from '@di/index';

describe('UserHelper', () => {
  const userHelper = container.resolve(UserHelper);
  const emailTest = 'test@123.com';
  describe('checkIfEquals', () => {
    it('Should return true when the data received is not registered', () => {
      expect(userHelper.checkIfEquals(emailTest, 'email', [])).toBe(true);
    });
    it('Should return false when the data received is registered', () => {
      const userMock: IUser[] = [{} as IUser];
      userMock[0].email = emailTest;
      expect(userHelper.checkIfEquals(emailTest, 'email', userMock)).toBe(
        false
      );
    });
  });
  describe('calcDigit', () => {
    it('Should result 0 when calculating 123456789', () => {
      const result = userHelper.calcDigit([1, 2, 3, 4, 5, 6, 7, 8, 9]);
      expect(result).toBe(0);
    });
  });
  describe('cpfValidate', () => {
    it('Should return true when validating 12345678909', () => {
      expect(userHelper.cpfValidate('12345678909')).toBe(true);
    });
    it('Should return false when validating a CPF that is the sequence of the same number (11111111111)', () => {
      expect(userHelper.cpfValidate('11111111111')).toBe(false);
    });
    it('Should return false when validating a CPF whose first validation digit is invalid (12345678959)', () => {
      expect(userHelper.cpfValidate('12345678959')).toBe(false);
    });
    it('Should return false when validating a CPF whose second validation digit is invalid (12345678905)', () => {
      expect(userHelper.cpfValidate('12345678905')).toBe(false);
    });
  });
});
