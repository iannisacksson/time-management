import { Router } from 'express';

import { availableSchedulesController } from '../controllers/availableSchedulesController';
import { timesController } from '../controllers/timesController';
import { create, id, query } from './validations/times.validation';

const timesRouter = Router();

timesRouter.post('/', create, (request, response) => {
  return timesController.create(request, response);
});

timesRouter.get('/', (request, response) => {
  return timesController.index(request, response);
});

timesRouter.delete('/:id', id, (request, response) => {
  return timesController.delete(request, response);
});

timesRouter.get('/available', query, (request, response) => {
  return availableSchedulesController.index(request, response);
});

export { timesRouter };
