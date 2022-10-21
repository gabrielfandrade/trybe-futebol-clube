import { Request, Response } from 'express';
import userService from '../services/user.service';

class UserController {
  public static login = async (req: Request, res: Response) => {
    const { email, password } = req.body;

    const user = await userService.login({ email, password });

    return res.status(200).json(user);
  };
}

export default UserController;
