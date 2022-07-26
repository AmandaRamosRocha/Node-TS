import Iuser from './IUser';

export default interface IUserCreateService {
  createUser(body: Iuser): Iuser;
}
