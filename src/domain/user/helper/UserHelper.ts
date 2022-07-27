import IUserHelper from '@interfaces/domain/IUserHelper';
import IUser from '@interfaces/domain/IUser';
import StatusError from '@util/StatusError';

export default class UserHelper implements IUserHelper {
  public checkIfEquals(
    field: string,
    fieldName: keyof IUser,
    database: IUser[]
  ): void {
    const emailUser = Object.values(database);
    emailUser.map((value: IUser) => {
      if (value[fieldName] === field) {
        throw new StatusError(422, `${fieldName} ${field} já existe`);
      }
    });
  }

  public calcDigit(cpfArray: number[], start = 1): number | undefined {
    let result: number | undefined =
      cpfArray.reduce(
        (resultValue: number, currentValue: number, currentIndex: number) => {
          const totalSum = resultValue + currentValue * (currentIndex + start);
          return totalSum;
        },
        0
      ) % 11;
    if (result >= 10) {
      const resultString = Array.from(result.toString(), Number);
      result = resultString.pop();
    }
    return result;
  }

  public cpfValidate(cpf: string): void {
    let cpfArray = Array.from(cpf, Number);

    const firstDigit = cpfArray[0];
    for (let i = 1; i < cpfArray.length; i++) {
      if (cpfArray[i] !== firstDigit) {
        break;
      } else if (i === cpfArray.length - 1) {
        throw new StatusError(422, 'CPF inválido');
      }
    }

    const confirmationDigits = cpfArray.slice(-2);
    cpfArray = cpfArray.slice(0, -2);

    const firstDigitAfterDash = this.calcDigit(cpfArray);
    if (firstDigitAfterDash !== confirmationDigits[0]) {
      throw new StatusError(422, 'CPF inválido');
    }
    cpfArray.push(firstDigitAfterDash);
    if (this.calcDigit(cpfArray, 0) !== confirmationDigits[1])
      throw new StatusError(422, 'CPF inválido');
  }
}
