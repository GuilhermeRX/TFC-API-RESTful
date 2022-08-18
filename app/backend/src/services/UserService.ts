import User from '../database/models/users';
import InvalidCredentials from '../erros/InvalidCredentials';
import NotFoundError from '../erros/NotFoundError';
import JwtService from './JwtService';
import passwordService from './passwordService';

export interface ILogin {
  email: string;
  password: string;
}
export interface IUserService {
  loginUser({ email, password }: ILogin): Promise<string>;
  getUser(token: string): Promise<User>
}

export default class UserService implements IUserService {
  private db = User;

  async loginUser({ email, password }: ILogin): Promise<string> {
    const user = await this.db.findOne({ where: { email } });

    if (!user) throw new NotFoundError(401, 'Incorrect email or password');

    const verify = passwordService.comparePassword(password, user.password);
    if (!verify) throw new InvalidCredentials(400, 'Dados inválidos');

    return JwtService.sign({ email });
  }

  async getUser(token: string): Promise<User> {
    const data = JwtService.validateToken(token);
    const user = await this.db.findOne({ where: { email: data.email } });
    return user as User;
  }
}
