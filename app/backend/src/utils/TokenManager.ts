import { sign, verify } from 'jsonwebtoken';
import { IUserWithoutPassword } from '../interfaces/IUser';

const tokenSecret = process.env.JWT_SECRET;

class TokenManager {
  public static createToken({ id, username, role, email }: IUserWithoutPassword): string {
    const payload = {
      id,
      username,
      role,
      email,
    };

    const token = sign(payload, tokenSecret as string);

    return token;
  }

  public static authorizationToken(authorization: string): string {
    if (!authorization) {
      return 'Invalid';
    }

    try {
      const user = verify(authorization, tokenSecret as string);

      return user as string;
    } catch (error) {
      return 'Invalid';
    }
  }
}

export default TokenManager;
