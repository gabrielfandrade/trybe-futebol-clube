interface IUser {
  id: number;
  username: string;
  role: string;
  email: string;
  password: string;
}

interface IUserWithoutId {
  username: string;
  role: string;
  email: string;
  password: string;
}

interface IUserWithoutPassword {
  id: number;
  username: string;
  role: string;
  email: string;
}

export { IUser, IUserWithoutId, IUserWithoutPassword };
