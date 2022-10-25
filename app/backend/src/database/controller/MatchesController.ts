import { Request, Response } from 'express';
import MatchesServices from '../services/matches.service';
// import GetterErrors from '../utils/GetterErrors';

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

  async createMatches(req: Request, res: Response) {
    const newMatch = { ...req.body, inProgress: 1 };
    const match = await this.matchesService.createMatches(newMatch);

    return res.status(201).json(match);
  }

  async updateMatchesFinished(req: Request, res: Response) {
    const { id } = req.params;
    await this.matchesService.updateMatchesFinished(Number(id));

    return res.status(200).json({ message: 'Finished' });
  }

  async updateMatches(req: Request, res: Response) {
    const { id } = req.params;
    const idNumber = Number(id);
    const { homeTeamGoals, awayTeamGoals } = req.body;
    await this.matchesService.updateMatches({ id: idNumber, homeTeamGoals, awayTeamGoals });

    return res.status(200).json({ message: 'goals updated' });
  }
}
