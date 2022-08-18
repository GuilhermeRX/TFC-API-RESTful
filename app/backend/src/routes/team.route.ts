import { Router } from 'express';
import TeamController from '../controllers/teamController';
import TeamService from '../services/TeamService';

const teamService = new TeamService();
const teamController = new TeamController(teamService);

const teamRouter = Router();

teamRouter.get('/', (req, res) => teamController.getAll(req, res));

export default teamRouter;
