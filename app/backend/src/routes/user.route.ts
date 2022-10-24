import { Router } from 'express';
import UserController from '../controllers/user.controller';
import ValidateUser from '../middleware/validateUser';

const userRoute = Router();

const { validateEmail, validatePassword } = ValidateUser;

userRoute.post('/', validateEmail, validatePassword, UserController.login);

export default userRoute;
