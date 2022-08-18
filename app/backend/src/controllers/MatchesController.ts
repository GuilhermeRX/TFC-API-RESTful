import { Request, Response } from 'express';
import MatchesService from '../services/MatchesService';

export default class MatchesController {
  constructor(private matchesService: MatchesService) { }
  async getAll(req: Request, res: Response) {
    if (req.query.inProgress === 'true') {
      const matches = await this.matchesService.getAll(true);
      return res.status(200).json(matches);
    }
    const matches = await this.matchesService.getAll(false);
    res.status(200).json(matches);
  }

  async createMatches(req: Request, res: Response) {
    const matches = await this.matchesService.createMatches(req.body);
    res.status(201).json(matches);
  }
}
