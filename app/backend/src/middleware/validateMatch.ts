import { Request, Response, NextFunction } from 'express';
import TeamService from '../services/team.service';

class ValidateMatch {
  public static validateTeams = async (req: Request, res: Response, next: NextFunction) => {
    const { homeTeam, awayTeam } = req.body;

    if (homeTeam === awayTeam) {
      return res.status(422)
        .json({ message: 'It is not possible to create a match with two equal teams' });
    }

    return next();
  };

  public static validateDB = async (req: Request, res: Response, next: NextFunction) => {
    const { homeTeam, awayTeam } = req.body;

    const { count } = await TeamService.count(homeTeam, awayTeam);

    if (count !== 2) {
      return res.status(404)
        .json({ message: 'There is no team with such id!' });
    }

    return next();
  };
}

export default ValidateMatch;
