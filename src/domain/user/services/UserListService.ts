import IUserListService from '@interfaces/domain/IUserListService';
import { inject, injectable } from 'tsyringe';
import IUserRepository from '@interfaces/domain/IUserRepository';
import IUser from '@interfaces/domain/IUser';

@injectable()
export default class UserListService implements IUserListService {
  userRepository: IUserRepository;
  constructor(@inject('UserRepository') userRepository: IUserRepository) {
    this.userRepository = userRepository;
  }

  public listUser(): IUser[] {
    const result: IUser[] = this.userRepository.readAll();
    return result;
  }
}
