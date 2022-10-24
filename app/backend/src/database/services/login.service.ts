import bcrypt = require('bcryptjs');
import UserModel from '../models/User';
import 'express-async-errors';
import ILogin, { ILoginService, IUsers } from '../models/entites/ILogin';
import GetterErrors from '../utils/GetterErrors';

export default class LoginServices implements ILoginService {
  private usersModel;
  constructor() {
    this.usersModel = UserModel;
  }

  async getId(id: number): Promise<IUsers> {
    const user: IUsers | null = await this.usersModel.findOne({ where: { id } });

    if (!user) throw new GetterErrors('dont find Id', 401);

    return user;
  }

  async getToken({ email, password }: ILogin): Promise<IUsers> {
    const user: IUsers | null = await this.usersModel.findOne({ where: { email } });
    if (!user) throw new GetterErrors('Incorrect email or password', 401);

    const hasPassword = bcrypt.compareSync(password, user.password);

    if (!hasPassword) throw new GetterErrors('Incorrect email or password', 401);

    return user;
  }
}
