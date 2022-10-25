import { Router } from 'express';
import MatchController from '../controllers/match.controller';
import ValidateMatch from '../middleware/validateMatch';
import ValidateUser from '../middleware/validateUser';

const { validateTeams, validateDB } = ValidateMatch;

const { validateToken } = ValidateUser;

const matchRoute = Router();

matchRoute.get('/', MatchController.matches);

matchRoute.post('/', validateTeams, validateDB, validateToken, MatchController.create);

matchRoute.patch('/:id/finish', MatchController.finish);

export default matchRoute;
