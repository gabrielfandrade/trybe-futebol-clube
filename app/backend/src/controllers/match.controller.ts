import { Request, Response } from 'express';
import MatchService from '../services/match.service';

class MatchController {
  public static matches = async (req: Request, res: Response) => {
    const { inProgress } = req.query;

    if (inProgress) {
      const progress = inProgress === 'true';

      const matches = await MatchService.matchesInProgress(progress);

      return res.status(200).json(matches);
    }

    const matches = await MatchService.matches();

    return res.status(200).json(matches);
  };
}

export default MatchController;
