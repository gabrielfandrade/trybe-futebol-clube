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
}

export default TeamService;
