import { Request, Response } from 'express';
import { IUserService } from '../services/UserService';
import validateUser from '../utils/validateUser';

export default class UserController {
  constructor(private userService: IUserService) { }

  async loginUser(req: Request, res: Response) {
    const userValid = validateUser(req.body);
    const token = await this.userService.loginUser(userValid);
    res.status(200).json({ token });
  }

  async getUserRole(req: Request, res: Response) {
    const { authorization } = req.headers;
    const { role } = await this.userService.getUser(authorization as string);
    res.status(200).json({ role });
  }
}
