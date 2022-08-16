import IUserListService from '@interfaces/domain/IUserListService';
import { inject, injectable } from 'tsyringe';
import IUserRepository from '@interfaces/domain/IUserRepository';
import IUser from '@interfaces/domain/IUser';

@injectable()
export default class UserListService implements IUserListService {
  constructor(
    @inject('UserRepository') private userRepository: IUserRepository
  ) {}

  public userList(): IUser[] {
    const result: IUser[] = this.userRepository.readAll();
    return result;
  }
}
