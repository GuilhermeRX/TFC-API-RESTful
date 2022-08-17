import { Router } from 'express';
import UserController from '../controllers/userController';
import UserService from '../services/UserService';

const userService = new UserService();
const userController = new UserController(userService);

const userRouter = Router();

userRouter.post('/', (req, res) => userController.loginUser(req, res));

export default userRouter;
