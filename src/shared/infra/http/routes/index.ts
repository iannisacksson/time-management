import { timesRouter } from '@modules/schedulingTimes/infra/http/routes/times.routes';
import { Router } from 'express';

const routes = Router();

routes.use('/times', timesRouter);

export default routes;
