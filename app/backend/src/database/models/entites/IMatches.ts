export default interface IUpdateMatch {
  id: number,
  homeTeamGoals: number,
  awayTeamGoals: number,
}

interface ILeaderboardHome {
  name: string,
  totalPoints: number,
  totalGames: number,
  totalVictories: number,
  totalDraws: number,
  totalLosses: number,
  goalsFavor: number,
  goalsOwn: number,
  goalsBalance: number,
  efficiency: number | string,
}

export { ILeaderboardHome };
