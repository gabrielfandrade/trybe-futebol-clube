import { sign } from 'jsonwebtoken';
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
}

export default TokenManager;
