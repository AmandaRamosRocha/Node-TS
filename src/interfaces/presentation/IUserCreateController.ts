import { Request, Response } from 'express';

export default interface IUserCreateController {
  handle: (req: Request, res: Response) => void;
}