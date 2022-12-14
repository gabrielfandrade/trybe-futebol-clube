import { IUserWithoutPassword } from '../interfaces/IUser';
import User from '../database/models/user';
import TokenManager from '../utils/TokenManager';
import bcrypt from '../utils/bcrypt';

interface IRequest {
  email: string;
  password: string;
}

class UserService {
  public static login = async ({ email, password }: IRequest) => {
    const user = await User.findOne({
      where: { email },
    });

    if (!user) {
      throw new Error('Incorrect email or password');
    }

    if (!bcrypt.checkPassword(password, user.password)) {
      throw new Error('Incorrect email or password');
    }

    const token = TokenManager.createToken(user);

    return token;
  };

  public static validate = async (authorization: string) => {
    const user = TokenManager.authorizationToken(authorization);

    return user as unknown as IUserWithoutPassword;
  };
}

export default UserService;
