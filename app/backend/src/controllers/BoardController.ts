import { Request, Response } from 'express';
import BoardService from '../services/BoardService';

export default class BoardController {
  constructor(private service: BoardService) { }

  async tableHome(req: Request, res: Response) {
    const table = await this.service.tableHome();
    res.status(200).json(table);
  }

  async tableAway(req: Request, res: Response) {
    const table = await this.service.tableAway();
    res.status(200).json(table);
  }

  async table(req: Request, res: Response) {
    const table = await this.service.table();
    res.status(200).json(table);
  }
}
