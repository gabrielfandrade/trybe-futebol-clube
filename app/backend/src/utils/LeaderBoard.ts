import ILeaderBoard from '../interfaces/ILeaderBoard';
import IMatch from '../interfaces/IMatch';

class LeaderBoard implements ILeaderBoard {
  name: string;
  totalPoints: number;
  totalGames: number;
  totalVictories: number;
  totalDraws: number;
  totalLosses: number;
  goalsFavor: number;
  goalsOwn: number;
  goalsBalance: number;
  efficiency: number;

  // Source: https://stackoverflow.com/q/14667713/how-to-convert-a-string-to-number-in-typescript
  constructor({ name, totalVictories, totalDraws, totalLosses, goalsFavor, goalsOwn }: IMatch) {
    this.name = name;
    this.totalPoints = LeaderBoard.points(+totalVictories, +totalDraws);
    this.totalGames = LeaderBoard.games(+totalVictories, +totalDraws, +totalLosses);
    this.totalVictories = +totalVictories;
    this.totalDraws = +totalDraws;
    this.totalLosses = +totalLosses;
    this.goalsFavor = +goalsFavor;
    this.goalsOwn = +goalsOwn;
    this.goalsBalance = LeaderBoard.balance(+goalsFavor, +goalsOwn);
    this.efficiency = LeaderBoard.efficiency(this.totalPoints, this.totalGames);
  }

  private static points = (totalVictories: number, totalDraws: number) =>
    (totalVictories * 3) + totalDraws;

  private static games = (totalVictories: number, totalDraws: number, totalLosses: number) =>
    totalVictories + totalDraws + totalLosses;

  private static balance = (goalsFavor: number, goalsOwn: number) =>
    goalsFavor - goalsOwn;

  private static efficiency = (totalPoints: number, totalGames: number) => {
    const games = totalGames * 3;
    const points = totalPoints / games;
    const percent = points * 100;

    return +percent.toFixed(2);
  };
}

export default LeaderBoard;
