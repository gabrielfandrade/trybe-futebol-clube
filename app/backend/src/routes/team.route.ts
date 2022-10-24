import { Router } from 'express';
import TeamController from '../controllers/team.controller';

const teamRoute = Router();

teamRoute.get('/', TeamController.teams);

teamRoute.get('/:id', TeamController.team);

export default teamRoute;
