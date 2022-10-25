import { Request, Response } from 'express';
import MatchesServices from '../services/matches.service';

export default class MatchesController {
  private matchesService;

  constructor(MatchesService: MatchesServices) {
    this.matchesService = MatchesService;
  }

  async getAllMatches(_req: Request, res: Response) {
    const matches = await this.matchesService.getAllMatches();

    return res.status(200).json(matches);
  }

  async getByQuery(req: Request, res: Response) {
    const { inProgress } = req.query;
    const Bool = inProgress === 'true';
    const matches = await this.matchesService.getByQuery(Bool);

    return res.status(200).json(matches);
  }
}
