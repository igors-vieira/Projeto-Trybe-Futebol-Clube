const BigqueryLAway = `SELECT t.team_name as 'name',
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
    (SUM(m.away_team_goals) - SUM(m.home_team_goals)) as 'goalsBalance',
    ROUND((Sum(CASE
    WHEN m.home_team_goals < m.away_team_goals THEN 3
    WHEN m.home_team_goals > m.away_team_goals THEN 0
    ELSE 1
        END) / (COUNT(m.away_team) * 3)) * 100, 2) as 'efficiency'
FROM matches as m
INNER JOIN teams as t
ON t.id = m.away_team
WHERE in_progress = 0
GROUP BY away_team
ORDER BY 
 totalPoints DESC,
   totalVictories DESC,
   goalsBalance DESC, 
      goalsFavor DESC,
       goalsOwn DESC`;

export default BigqueryLAway;
