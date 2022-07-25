import IUserListService from '@interfaces/domain/IUserListService';
import { inject, injectable } from 'tsyringe';
import IUserRepository from '@interfaces/domain/IUserRepository';
import IUserListResponse from '@interfaces/domain/IUserListResponse';

@injectable()
export default class UserListService implements IUserListService {
  userRepository: IUserRepository;
  constructor(@inject('UserRepository') userRepository: IUserRepository) {
    this.userRepository = userRepository;
  }

  listUser(): IUserListResponse[] {
    const result: IUserListResponse[] = this.userRepository.database.map(
      ({ fullName, email }) => {
        return {
          fullName,
          email,
        };
      }
    );
    return result;
  }
}
