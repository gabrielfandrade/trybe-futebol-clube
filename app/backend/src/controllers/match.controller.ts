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

  public static create = async (req: Request, res: Response) => {
    const { homeTeam, awayTeam, homeTeamGoals, awayTeamGoals } = req.body;

    const match = await MatchService.create({ homeTeam, awayTeam, homeTeamGoals, awayTeamGoals });

    return res.status(201).json(match);
  };

  public static finish = async (req: Request, res: Response) => {
    const { id } = req.params;

    const message = await MatchService.finish(id);

    return res.status(200).json(message);
  };
}

export default MatchController;
