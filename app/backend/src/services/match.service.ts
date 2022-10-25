import Team from '../database/models/team';
import Match from '../database/models/match';

interface IRequest {
  homeTeam: number,
  awayTeam: number,
  homeTeamGoals: number,
  awayTeamGoals: number,
}

class MatchService {
  public static matches = async () => {
    const matches = await Match.findAll({
      include: [{
        model: Team,
        as: 'teamHome',
        attributes: { exclude: ['id'] },
      },
      {
        model: Team,
        as: 'teamAway',
        attributes: { exclude: ['id'] },
      }],
    });

    return matches;
  };

  public static matchesInProgress = async (inProgress: boolean) => {
    const matches = await Match.findAll({
      where: { inProgress },
      include: [{
        model: Team,
        as: 'teamHome',
        attributes: { exclude: ['id'] },
      },
      {
        model: Team,
        as: 'teamAway',
        attributes: { exclude: ['id'] },
      }],
    });

    return matches;
  };

  public static create = async ({ homeTeam, awayTeam, homeTeamGoals, awayTeamGoals }: IRequest) => {
    const inProgress = true;

    const match = await Match
      .create({ homeTeam, awayTeam, homeTeamGoals, awayTeamGoals, inProgress });

    return match;
  };

  public static finish = async (id: string) => {
    await Match.update(
      { inProgress: false },
      { where: { id } },
    );

    return { message: 'Finished' };
  };

  public static goals = async (id: string, homeTeamGoals: number, awayTeamGoals: number) => {
    const match = await Match.update({
      homeTeamGoals,
      awayTeamGoals,
    }, {
      where: { id },
    });

    return match;
  };
}

export default MatchService;
