import IUser from './IUser';

export default interface IUserRepository {
  database: IUser[];
  create(entity: IUser): IUser;
  readAll(): IUser[];
}
