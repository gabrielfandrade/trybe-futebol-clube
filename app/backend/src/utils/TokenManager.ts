import { sign, verify } from 'jsonwebtoken';
import { IUserWithoutPassword } from '../interfaces/IUser';

const tokenSecret = process.env.JWT_SECRET || 'senhaSecreta';

class TokenManager {
  public static createToken({ id, username, role, email }: IUserWithoutPassword): string {
    const payload = {
      id,
      username,
      role,
      email,
    };

    const token = sign(payload, tokenSecret);

    return token;
  }

  public static authorizationToken(authorization: string): IUserWithoutPassword {
    if (!authorization) {
      throw new Error('Invalid Token');
    }

    try {
      const user = verify(authorization, tokenSecret);

      return user as IUserWithoutPassword;
    } catch (error) {
      throw new Error('Invalid Token');
    }
  }
}

export default TokenManager;
