import { Request, Response } from 'express';
import { ITeamService } from '../services/TeamService';

export default class TeamController {
  constructor(private teamService: ITeamService) { }
  async getAll(req: Request, res: Response) {
    const teams = await this.teamService.getAll();
    res.status(200).json(teams);
  }

  async getById(req: Request, res: Response) {
    const { id } = req.params;
    const team = await this.teamService.getById(Number(id));
    res.status(200).json(team);
  }
}
