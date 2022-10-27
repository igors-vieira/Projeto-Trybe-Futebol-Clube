const LeaderboardAllQuery = `
SELECT 
hl.name,
  SUM(al.totalPoints + hl.totalPoints) as 'totalPoints',
  SUM(hl.totalGames + al.totalGames) as 'totalGames',
  SUM(al.totalVictories + hl.totalVictories) as 'totalVictories',
  SUM(al.totalDraws + hl.totalDraws) as 'totalDraws',
  SUM(al.totalLosses + hl.totalLosses) as 'totalLosses',
  SUM(al.goalsFavor + hl.goalsFavor) as 'goalsFavor',
  SUM(al.goalsOwn + hl.goalsOwn) as 'goalsOwn',
SUM(al.goalsBalance + hl.goalsBalance) as 'goalsBalance', 
  ROUND((SUM(al.totalPoints + hl.totalPoints) / (SUM(al.totalGames + hl.totalGames) * 3)) * 100, 2)
   as 'efficiency'
  FROM (SELECT t.team_name as 'name',
Sum(CASE
  WHEN m.home_team_goals < m.away_team_goals THEN 3
  WHEN m.home_team_goals > m.away_team_goals THEN 0
  ELSE 1
      END) as 'totalPoints',
  SUM(CASE WHEN m.home_team_goals < m.away_team_goals THEN 1 ELSE 0 END) as 'totalVictories',
  SUM(CASE WHEN m.home_team_goals = m.away_team_goals THEN 1 ELSE 0 END) as 'totalDraws', 
  SUM(CASE WHEN m.home_team_goals > m.away_team_goals THEN 1 ELSE 0 END) as 'totalLosses', 
  COUNT(m.away_team) as 'totalGames',
  SUM(m.away_team_goals) as 'goalsFavor',
  SUM(m.home_team_goals) as 'goalsOwn',
  (SUM(m.away_team_goals) - SUM(m.home_team_goals)) as 'goalsBalance'
FROM matches as m
INNER JOIN teams as t
ON t.id = m.away_team
WHERE in_progress = 0
GROUP BY away_team) as al
INNER JOIN 
(SELECT 
t.team_name as 'name',
Sum(CASE
WHEN m.home_team_goals > m.away_team_goals THEN 3
WHEN m.home_team_goals < m.away_team_goals THEN 0
ELSE 1
    END) as 'totalPoints',
SUM(CASE WHEN m.home_team_goals > m.away_team_goals THEN 1 ELSE 0 END) as 'totalVictories',
SUM(CASE WHEN m.home_team_goals = m.away_team_goals THEN 1 ELSE 0 END) as 'totalDraws',
SUM(CASE WHEN m.home_team_goals < m.away_team_goals THEN 1 ELSE 0 END) as 'totalLosses',
COUNT(m.home_team) as 'totalGames',
SUM(m.home_team_goals) as 'goalsFavor',
SUM(m.away_team_goals) as 'goalsOwn',
(SUM(m.home_team_goals) - SUM(m.away_team_goals)) as 'goalsBalance'
FROM matches as m
INNER JOIN teams as t
ON t.id = m.home_team
WHERE in_progress = 0
GROUP BY home_team) as hl
ON al.name = hl.name
GROUP BY al.name
ORDER BY 
totalPoints DESC,
 totalVictories DESC,
  goalsBalance DESC,
    goalsFavor DESC,
     goalsOwn DESC`;

export default LeaderboardAllQuery;
