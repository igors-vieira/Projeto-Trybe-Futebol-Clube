import { Request, Response } from 'express';
import TeamsServices from '../services/teams.service';

export default class TeamsController {
  private teamsService;

  constructor(TeamsService: TeamsServices) {
    this.teamsService = TeamsService;
  }

  async getAllTeams(_req: Request, res: Response) {
    const teams = await this.teamsService.getAllTeams();

    return res.status(200).json(teams);
  }

  async getId(req: Request, res: Response) {
    const { id } = req.params;
    const team = await this.teamsService.getId(Number(id));

    return res.status(200).json(team);
  }
}
