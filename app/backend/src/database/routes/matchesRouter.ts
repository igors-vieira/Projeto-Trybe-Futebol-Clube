import { Router } from 'express';
import MatchesController from '../controller/MatchesController';
import MatchesServices from '../services/matches.service';

const matchesService = new MatchesServices();
const matchesController = new MatchesController(matchesService);

const router = Router();

router.get('/matches', (req, res) => (!req.query.inProgress ? matchesController
  .getAllMatches(req, res) : matchesController
  .getByQuery(req, res)));

export default router;
