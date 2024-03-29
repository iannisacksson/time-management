import { TimesController } from '@modules/schedulingTimes/infra/http/controllers/timesController/TimesController';
import { TimesRepository } from '@modules/schedulingTimes/repositories/implementations/TimesRepository';
import { CreateDailyServiceSchedulesService } from '@modules/schedulingTimes/services/CreateDailyServiceSchedulesService';
import { CreateSpecificServiceSchedulesService } from '@modules/schedulingTimes/services/CreateSpecificServiceSchedulesService';
import { CreateWeeklyServiceSchedulesService } from '@modules/schedulingTimes/services/CreateWeeklyServiceSchedulesService';
import { DeleteServiceRuleService } from '@modules/schedulingTimes/services/DeleteServiceRuleService';
import { ListServiceRuleService } from '@modules/schedulingTimes/services/ListServiceRuleService';

const timesRepository = TimesRepository.getInstance();

const createDailyServiceSchedulesService = new CreateDailyServiceSchedulesService(
  timesRepository,
);
const createSpecificServiceSchedulesService = new CreateSpecificServiceSchedulesService(
  timesRepository,
);
const createWeeklyServiceSchedulesService = new CreateWeeklyServiceSchedulesService(
  timesRepository,
);
const listServiceRuleService = new ListServiceRuleService(timesRepository);
const deleteServiceRuleService = new DeleteServiceRuleService(timesRepository);

const timesController = new TimesController(
  createSpecificServiceSchedulesService,
  createDailyServiceSchedulesService,
  createWeeklyServiceSchedulesService,
  listServiceRuleService,
  deleteServiceRuleService,
);

export { timesController };
