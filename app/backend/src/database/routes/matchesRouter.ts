import { Router } from 'express';
import MatchesController from '../controller/MatchesController';
import tokenMiddleware from '../middlewares/tokenMiddleware';
import MatchesServices from '../services/matches.service';

const matchesService = new MatchesServices();
const matchesController = new MatchesController(matchesService);

const router = Router();

router.get('/matches', (req, res) => (!req.query.inProgress ? matchesController
  .getAllMatches(req, res) : matchesController
  .getByQuery(req, res)));

router.get('/leaderboard/home', (req, res) => matchesController.LeaderboardHome(req, res));

router.get('/leaderboard/away', (req, res) => matchesController.LeaderboardAway(req, res));

router.get('/leaderboard/', (req, res) => matchesController.LeaderboardAll(req, res));

router.post('/matches', tokenMiddleware, (req, res) => matchesController.createMatches(req, res));

router.patch('/matches/:id/finish', (req, res) => matchesController
  .updateMatchesFinished(req, res));

router.patch('/matches/:id', (req, res) => matchesController.updateMatches(req, res));

export default router;
