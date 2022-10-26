import { Router } from 'express';
import LeaderboardController from '../controllers/leaderBoard.controller';

const leaderBoardRoute = Router();

leaderBoardRoute.get('/home', LeaderboardController.homeBoard);
leaderBoardRoute.get('/away', LeaderboardController.awayBoard);
leaderBoardRoute.get('/', LeaderboardController.board);

export default leaderBoardRoute;
