import UserHelper from '../helper/UserHelper';

class UtilUser {
  static emailValidator(email: string, email_confirmation: string) {
    if (email === email_confirmation) {
      return true;
    } else {
      throw new Error('Emails não coincidem');
    }
  }

  static cellphoneValidator(cellphone: string) {
    const validCellphone = UserHelper.lenghtValidate(cellphone, 11, 12);

    if (validCellphone) {
      return true;
    } else {
      throw new Error('Número de telefone inválido');
    }
  }

  static cpfValidator(cpf: string, user: object[]) {
    const cpfValid = UserHelper.CpfValidate(cpf);
    if (cpfValid) {
      UserHelper.checkIfEquals(cpf, user, 'CPF');
      return true;
    } else {
      throw new Error('CPF inválido');
    }
  }
}
export default UtilUser;
