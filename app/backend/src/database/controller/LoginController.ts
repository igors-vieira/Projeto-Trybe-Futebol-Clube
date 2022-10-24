import jwt = require('jsonwebtoken');
import { Secret } from 'jsonwebtoken';
import { Request, Response } from 'express';
import { ILoginService } from '../models/entites/ILogin';

const { JWT_SECRET } = process.env;

interface authId extends Request {
  user: {
    id: number
  }
}

export default class LoginController {
  private readonly loginService: ILoginService;
  constructor(loginService: ILoginService) {
    this.loginService = loginService;
  }

  async getId(req: Request, res: Response) {
    const { id } = req.body.user;

    const { role } = await this.loginService.getId(Number(id));

    res.status(200).json({ role });
  }

  async getToken(req: Request, res: Response) {
    const { email, password } = req.body;
    const { id, role } = await this.loginService.getToken({ email, password });

    const token = jwt.sign({ id, email, role }, JWT_SECRET as Secret);

    res.status(200).json({ token });
  }
}

export { authId };
