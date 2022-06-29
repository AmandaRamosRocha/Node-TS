import IUserHelper from './IUserHelper'
import Iuser from './IUser'
import IServiceResponse from './IServiceResponse'

export default interface IUserService {
  userHelper: IUserHelper
  criaUser(dados: Iuser): Promise<IServiceResponse>
}
