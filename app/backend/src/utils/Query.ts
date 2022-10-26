export const homeQuery = 'SELECT t.team_name AS name,'
  + ' SUM(m.home_team_goals > m.away_team_goals) AS totalVictories,'
  + ' SUM(m.home_team_goals = m.away_team_goals) AS totalDraws,'
  + ' SUM(m.home_team_goals < m.away_team_goals) AS totalLosses,'
  + ' SUM(m.home_team_goals) AS goalsFavor,'
  + ' SUM(m.away_team_goals) AS goalsOwn'
  + ' FROM matches AS m'
  + ' JOIN teams AS t ON t.id = m.home_team WHERE m.in_progress = false GROUP BY t.team_name';

export const awayQuery = 'SELECT t.team_name AS name,'
  + ' SUM(m.home_team_goals < m.away_team_goals) AS totalVictories,'
  + ' SUM(m.home_team_goals = m.away_team_goals) AS totalDraws,'
  + ' SUM(m.home_team_goals > m.away_team_goals) AS totalLosses,'
  + ' SUM(m.away_team_goals) AS goalsFavor,'
  + ' SUM(m.home_team_goals) AS goalsOwn'
  + ' FROM matches AS m'
  + ' JOIN teams AS t ON t.id = m.away_team WHERE m.in_progress = false GROUP BY t.team_name';
