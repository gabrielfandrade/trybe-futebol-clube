import { Request, Response } from 'express';
import LeaderboardService from '../services/leaderBoard.service';

class LeaderboardController {
  public static homeBoard = async (req: Request, res: Response) => {
    const board = await LeaderboardService.homeBoard();

    return res.status(200).json(board);
  };

  public static awayBoard = async (req: Request, res: Response) => {
    const board = await LeaderboardService.awayBoard();

    return res.status(200).json(board);
  };
}

export default LeaderboardController;
