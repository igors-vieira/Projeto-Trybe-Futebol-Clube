import MatchesModel from '../models/Matches';
import Teams from '../models/Teams';
import 'express-async-errors';
import GetterErrors from '../utils/GetterErrors';
import IUpdateMatch from '../models/entites/IMatches';

const IdNotFound = 'There is no team with such id!';

export default class MatchesServices {
  private matchesModel;
  constructor() {
    this.matchesModel = MatchesModel;
  }

  static async getIdTeam(id: number) {
    const team = await Teams.findByPk(id);

    return team;
  }

  async getAllMatches(): Promise<MatchesModel[]> {
    const teams = await this.matchesModel
      .findAll({
        include: [
          { model: Teams, as: 'teamHome', attributes: { exclude: ['id'] } },
          { model: Teams, as: 'teamAway', attributes: { exclude: ['id'] } }],
      });

    return teams;
  }

  async getByQuery(inProgress: boolean): Promise<MatchesModel[]> {
    const teams = await this.matchesModel
      .findAll({
        where: { inProgress },
        include: [
          { model: Teams, as: 'teamHome', attributes: { exclude: ['id'] } },
          { model: Teams, as: 'teamAway', attributes: { exclude: ['id'] } }],
      });

    return teams;
  }

  async createMatches(matches: MatchesModel): Promise<MatchesModel> {
    const { homeTeam, awayTeam } = matches;
    const home = await MatchesServices.getIdTeam(homeTeam);
    const away = await MatchesServices.getIdTeam(awayTeam);
    console.log(home);
    console.log(away);

    if (!home || !away) throw new GetterErrors(IdNotFound, 404);
    if (homeTeam === awayTeam) {
      throw new GetterErrors('It is not possible to create a match with two equal teams', 422);
    }
    const team = await this.matchesModel.create(matches);

    return team;
  }

  async updateMatches({ id, homeTeamGoals, awayTeamGoals }: IUpdateMatch): Promise<void> {
    const hasTeam = await this.matchesModel.findByPk(id);
    if (!hasTeam) throw new GetterErrors(IdNotFound, 404);

    await this.matchesModel.update({ homeTeamGoals, awayTeamGoals }, { where: { id } });
  }

  async updateMatchesFinished(id: number): Promise<void> {
    const hasTeam = await this.matchesModel.findByPk(id);
    if (!hasTeam) throw new GetterErrors(IdNotFound, 404);

    await this.matchesModel.update({ inProgress: 0 }, { where: { id } });
  }
}
