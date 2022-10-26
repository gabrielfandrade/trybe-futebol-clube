import { Request, Response } from 'express';
import LeaderboardService from '../services/leaderboard.service';

class LeaderboardController {
  public static board = async (req: Request, res: Response) => {
    const board = await LeaderboardService.board();

    return res.status(200).json(board);
  };
}

export default LeaderboardController;
