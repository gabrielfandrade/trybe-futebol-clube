import User from '../database/models/user';

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
      return 'Nenhum Usuario encontrado';
    }

    return user;
  };
}

export default UserService;
