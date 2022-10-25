import * as jwt from 'jsonwebtoken';
import { NextFunction, Response, Request } from 'express';
import GetterErrors from '../utils/GetterErrors';
import 'express-async-errors';

const { JWT_SECRET } = process.env;

export default async (req: Request, res: Response, next: NextFunction) => {
  const token = req.header('Authorization');
  if (!token) throw new GetterErrors('Token not found', 401);

  try {
    const payload = jwt.verify(token, JWT_SECRET as jwt.Secret);
    req.body.user = payload;
    return next();
  } catch (error) {
    throw new GetterErrors('Token must be a valid token', 401);
  }
};
