import { Request, Response } from 'express';
import { ITeamService } from '../services/TeamService';

export default class TeamController {
  constructor(private teamService: ITeamService) { }
  async getAll(req: Request, res: Response) {
    const teams = await this.teamService.getAll();
    res.status(200).json(teams);
  }
}
