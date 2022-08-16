import { injectable, inject } from 'tsyringe';
import IUser from '@interfaces/domain/IUser';
import IUserHelper from '@interfaces/domain/IUserHelper';
import IUserValidation from '@interfaces/domain/IUserValidation';

@injectable()
export default class UserValidation implements IUserValidation {
  constructor(@inject('UserHelper') private userHelper: IUserHelper) {}

  public validate(cpf: string, email: string, database: IUser[]) {
    if (!this.userHelper.cpfValidate(cpf)) {
      throw new Error(`CPF ${cpf} inválido`);
    }
    if (!this.userHelper.checkIfEquals(cpf, 'cpf', database)) {
      throw new Error(`CPF ${cpf} já cadastrado`);
    }
    if (!this.userHelper.checkIfEquals(email, 'email', database)) {
      throw new Error(`Email ${email} já cadastrado`);
    }
  }
}
