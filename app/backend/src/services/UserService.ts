import User from '../database/models/users';
import InvalidCredentials from '../erros/InvalidCredentials';
import NotFoundError from '../erros/NotFoundError';
import JwtService from './JwtService';
import passwordService from './passwordService';

interface LoginUser {
  loginUser(email: string, password: string): Promise<string>;
}

export default class UserService implements LoginUser {
  private db = User;

  async loginUser(email: string, password: string): Promise<string> {
    const user = await this.db.findOne({ where: { email, password } });

    if (!user) throw new NotFoundError(404, 'User not Found!');

    const verify = passwordService.comparePassword(password, user.password);
    if (!verify) throw new InvalidCredentials(400, 'Dados inválidos');

    return JwtService.sign({ email });
  }
}
