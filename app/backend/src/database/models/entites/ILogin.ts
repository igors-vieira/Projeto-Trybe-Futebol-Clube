// import UserModel from '../User';

interface ILogin {
  email: string,
  password: string
}

interface IUsers {
  id?: number;
  email: string;
  password: string;
  username?: string;
  role?: string;
}

interface ILoginService {
  getId(id: number): Promise<IUsers>
  getToken(login: ILogin): Promise<IUsers>
}

export default ILogin;
export { ILoginService, IUsers };
