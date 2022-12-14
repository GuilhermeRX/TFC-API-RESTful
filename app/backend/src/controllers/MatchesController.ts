import { Request, Response } from 'express';
import JwtService from '../services/JwtService';
import MatchesService from '../services/MatchesService';
import validateMatche from '../utils/validateMatche';

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
    const { authorization } = req.headers;
    JwtService.validateToken(authorization as string);
    validateMatche(req.body);
    const matches = await this.matchesService.createMatches(req.body);
    res.status(201).json(matches);
  }

  async finishMatches(req: Request, res: Response) {
    const { id } = req.params;
    await this.matchesService.finishMatches(Number(id));
    res.status(200).json({ message: 'Finished' });
  }

  async updateMatches(req: Request, res: Response) {
    const { id } = req.params;
    await this.matchesService.updateMatches(req.body, Number(id));
    res.status(200).json({ message: 'Updated' });
  }
}
