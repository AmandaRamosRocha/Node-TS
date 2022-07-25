import IUser from '@interfaces/domain/IUser';
import IUserRepository from '@interfaces/domain/IUserRepository';

export default class UserRepository implements IUserRepository {
  database: IUser[];
  constructor() {
    this.database = [];
  }

  create(entity: IUser): void {
    this.database.push(entity);
  }

  readAll() {
    return this.database;
  }
}
