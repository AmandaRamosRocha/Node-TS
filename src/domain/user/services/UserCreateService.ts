import { inject, injectable } from 'tsyringe';
import IUserCreateService from '@interfaces/domain/IUserCreateService';
import IUser from '@interfaces/domain/IUser';
import IUserRepository from '@interfaces/domain/IUserRepository';
import IUserValidation from '@interfaces/domain/IUserValidation';

@injectable()
export default class UserCreateService implements IUserCreateService {
  userValidation: IUserValidation;
  userRepository: IUserRepository;
  constructor(
    @inject('UserValidation') userValidation: IUserValidation,
    @inject('UserRepository') userRepository: IUserRepository
  ) {
    this.userValidation = userValidation;
    this.userRepository = userRepository;
  }

  public createUser(body: IUser): IUser {
    this.userValidation.validate(
      body.cpf,
      body.email,
      this.userRepository.database
    );
    const newUser = this.userRepository.create(body);
    return newUser;
  }
}
