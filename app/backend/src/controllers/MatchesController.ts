import { Request, Response } from 'express';
import MatchesService from '../services/MatchesService';

export default class MatchesController {
  constructor(private matchesService: MatchesService) { }
  async getAll(req: Request, res: Response) {
    const matches = await this.matchesService.getAll();
    res.status(200).json(matches);
  }
}
