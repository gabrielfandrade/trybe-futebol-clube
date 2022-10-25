import Team from '../database/models/team';

class TeamService {
  public static teams = async () => {
    const teams = await Team.findAll();

    return teams;
  };

  public static team = async (id: string) => {
    const team = await Team.findOne({
      where: { id },
    });

    return team;
  };

  public static count = async (homeTeam: number, awayTeam: number) => {
    const count = await Team.findAndCountAll({
      where: { id: [homeTeam, awayTeam] },
    });

    return count;
  };
}

export default TeamService;
