import { NextFunction, Response, Request } from 'express';

interface error {
  message: string;
  status: number;
}

export default (err: error, _req: Request, res: Response, _next: NextFunction) => {
  if (err.status) {
    return res.status(err.status).json({ message: err.message });
  }
  return res.sendStatus(500);
};
