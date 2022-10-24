import { NextFunction, Request, Response } from 'express';

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
}

export default ValidateUser;
