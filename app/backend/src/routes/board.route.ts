import { Router } from 'express';
import BoardController from '../controllers/BoardController';
import BoardService from '../services/BoardService';

const boardRouter = Router();
const boardService = new BoardService();
const boardController = new BoardController(boardService);

boardRouter.get('/home', (req, res) => boardController.tableHome(req, res));
boardRouter.get('/away', (req, res) => boardController.tableAway(req, res));
boardRouter.get('/', (req, res) => boardController.table(req, res));

export default boardRouter;
