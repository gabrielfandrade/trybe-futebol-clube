import { NextFunction, Request, Response } from 'express';
import TokenManager from '../utils/TokenManager';

class ValidateUser {
  public static validateEmail = async (req: Request, res: Response, next: NextFunction) => {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ message: 'All fields must be filled' });
    }

    return next();
  };

  public static validatePassword = async (req: Request, res: Response, next: NextFunction) => {
    const { password } = req.body;

    if (!password) {
      return res.status(400).json({ message: 'All fields must be filled' });
    }

    return next();
  };

  public static validateToken = async (req: Request, res: Response, next: NextFunction) => {
    const { authorization } = req.headers;

    const message = TokenManager.authorizationToken(authorization as string);

    if (message === 'Invalid') {
      return res.status(401)
        .json({ message: 'Token must be a valid token' });
    }

    return next();
  };
}

export default ValidateUser;
