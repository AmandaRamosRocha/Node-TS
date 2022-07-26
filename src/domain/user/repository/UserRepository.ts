import IUser from '@interfaces/domain/IUser';
import IUserRepository from '@interfaces/domain/IUserRepository';

export default class UserRepository implements IUserRepository {
  database: IUser[];
  constructor() {
    this.database = [];
  }

  public create(entity: IUser): IUser {
    this.database.push(entity);
    return entity;
  }

  public readAll() {
    return this.database;
  }
}
