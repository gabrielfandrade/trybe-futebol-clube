import { Router } from 'express';
import MatchController from '../controllers/match.controller';

const matchRoute = Router();

matchRoute.get('/', MatchController.matches);

export default matchRoute;
