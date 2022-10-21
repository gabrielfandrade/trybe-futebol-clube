import { Router } from 'express';
import UserController from '../controllers/user.controller';

const userRoute = Router();

userRoute.post('/', UserController.login);

export default userRoute;
