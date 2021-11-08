import { Router } from 'express';

import { timesController } from '../controllers';
import { create, id } from './validations/times.validation';

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

export { timesRouter };
