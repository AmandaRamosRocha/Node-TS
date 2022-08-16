import IUser from './IUser';

export default interface IUserHelper {
  checkIfEquals(dados: string, field: keyof IUser, database: IUser[]): boolean;
  cpfValidate(cpf: string): boolean;
}
