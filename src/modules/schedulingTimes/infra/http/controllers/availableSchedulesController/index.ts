import { AvailableSchedulesController } from '@modules/schedulingTimes/infra/http/controllers/availableSchedulesController/AvailableSchedulesController';
import { TimesRepository } from '@modules/schedulingTimes/repositories/implementations/TimesRepository';
import { ListAvailableServiceHoursService } from '@modules/schedulingTimes/services/ListAvailableServiceHoursService';

const timesRepository = TimesRepository.getInstance();

const listServiceRuleService = new ListAvailableServiceHoursService(
  timesRepository,
);

const availableSchedulesController = new AvailableSchedulesController(
  listServiceRuleService,
);

export { availableSchedulesController };
