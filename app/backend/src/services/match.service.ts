import Team from '../database/models/team';
import Match from '../database/models/match';

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
}

export default MatchService;
