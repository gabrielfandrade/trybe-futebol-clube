import { Request, Response } from 'express';
import TeamService from '../services/team.service';

class TeamController {
  public static teams = async (req: Request, res: Response) => {
    const teams = await TeamService.teams();

    return res.status(200).json(teams);
  };

  public static team = async (req: Request, res: Response) => {
    const { id } = req.params;

    const team = await TeamService.team(id);

    return res.status(200).json(team);
  };
}

export default TeamController;
