import { Request, Response } from 'express';
import MatchService from '../services/match.service';

class MatchController {
  public static matches = async (req: Request, res: Response) => {
    const matches = await MatchService.matches();

    return res.status(200).json(matches);
  };
}

export default MatchController;
