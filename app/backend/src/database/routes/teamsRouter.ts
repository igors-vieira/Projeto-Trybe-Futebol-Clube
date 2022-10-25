import { Router } from 'express';
import TeamsController from '../controller/TeamsController';
import TeamsServices from '../services/teams.service';

const router = Router();

const teamsService = new TeamsServices();
const teamsController = new TeamsController(teamsService);

router.get('/teams', (req, res) => teamsController.getAllTeams(req, res));
router.get('/teams/:id', (req, res) => teamsController.getId(req, res));

export default router;
