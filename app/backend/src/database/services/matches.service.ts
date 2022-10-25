import MatchesModel from '../models/Matches';
import Teams from '../models/Teams';
import 'express-async-errors';
// import GetterErrors from '../utils/GetterErrors';

export default class MatchesServices {
  private matchesModel;
  constructor() {
    this.matchesModel = MatchesModel;
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
}
