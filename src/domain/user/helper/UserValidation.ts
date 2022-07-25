import { injectable, inject } from 'tsyringe';
import IUser from '@interfaces/domain/IUser';
import IUserHelper from '@interfaces/domain/IUserHelper';
import IUserValidation from '@interfaces/domain/IUserValidation';

@injectable()
export default class UserValidation implements IUserValidation {
  userHelper: IUserHelper;
  constructor(@inject('UserHelper') userHelper: IUserHelper) {
    this.userHelper = userHelper;
  }

  validate(cpf: string, email: string, database: IUser[]) {
    this.userHelper.cpfValidate(cpf);
    this.userHelper.checkIfEquals(cpf, 'cpf', database);
    this.userHelper.checkIfEquals(email, 'email', database);
  }
}
