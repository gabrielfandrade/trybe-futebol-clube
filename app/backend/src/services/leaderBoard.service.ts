import IMatch from '../interfaces/IMatch';
import LeaderBoard from '../utils/LeaderBoard';
import db from '../database/models';
import { homeQuery, awayQuery } from '../utils/Query';

class LeaderBoardService {
  public static homeBoard = async () => {
    const [matches] = await db.query(homeQuery);

    const leaderBoard = LeaderBoardService.leaderBoard(matches as IMatch[]);

    return leaderBoard;
  };

  public static awayBoard = async () => {
    const [matches] = await db.query(awayQuery);

    const leaderBoard = LeaderBoardService.leaderBoard(matches as IMatch[]);

    return leaderBoard;
  };

  private static leaderBoard = (matches: IMatch[]): LeaderBoard[] => {
    const leaderBoard: LeaderBoard[] = [];

    matches.forEach((match) => {
      const board = new LeaderBoard(match);

      leaderBoard.push(board);
    });

    const orderlyLeaderBoard = LeaderBoardService.ordering(leaderBoard);

    return orderlyLeaderBoard;
  };

  private static ordering = (leaderBoard: LeaderBoard[]): LeaderBoard[] => {
    const orderly = leaderBoard.sort((boardA, boardB) =>
      LeaderBoardService.sort(boardA, boardB));

    return orderly;
  };

  private static sort = (boardA: LeaderBoard, boardB: LeaderBoard) => {
    if (boardA.totalPoints !== boardB.totalPoints) {
      return boardB.totalPoints - boardA.totalPoints;
    } if (boardA.totalVictories !== boardB.totalVictories) {
      return boardB.totalVictories - boardA.totalVictories;
    } if (boardA.goalsBalance !== boardB.goalsBalance) {
      return boardB.goalsBalance - boardA.goalsBalance;
    } if (boardA.goalsFavor !== boardB.goalsFavor) {
      return boardB.goalsFavor - boardA.goalsFavor;
    } return boardA.goalsOwn - boardB.goalsOwn;
  };
}

export default LeaderBoardService;
