import { Request, Response } from 'express';
import userService from '../services/user.service';

class UserController {
  public static login = async (req: Request, res: Response) => {
    const { email, password } = req.body;

    try {
      const token = await userService.login({ email, password });

      return res.status(200).json({ token });
    } catch (error) {
      return res.status(401).json({ message: 'Incorrect email or password' });
    }
  };
}

export default UserController;
