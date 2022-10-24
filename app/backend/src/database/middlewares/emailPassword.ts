import { NextFunction, Response, Request } from 'express';
import loginSchema from './schemas/schemas';

export default (req: Request, res: Response, next: NextFunction) => {
  const { email, password } = req.body;
  const { error } = loginSchema.validate({
    email,
    password,
  });

  if (error) return res.status(400).json({ message: error.message });

  return next();
};
