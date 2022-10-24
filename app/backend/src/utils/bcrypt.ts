import { compareSync } from 'bcryptjs';

class bcrypt {
  public static checkPassword(password: string, hash: string): boolean {
    const check = compareSync(password, hash);

    return check;
  }
}

export default bcrypt;
