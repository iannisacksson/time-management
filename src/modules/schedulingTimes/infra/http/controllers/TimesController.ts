import { CreateDailyServiceSchedulesService } from '@modules/schedulingTimes/services/CreateDailyServiceSchedulesService';
import { CreateSpecificServiceSchedulesService } from '@modules/schedulingTimes/services/CreateSpecificServiceSchedulesService';
import { CreateWeeklyServiceSchedulesService } from '@modules/schedulingTimes/services/CreateWeeklyServiceSchedulesService';
import { ListServiceRuleService } from '@modules/schedulingTimes/services/ListServiceRuleService';
import { Request, Response } from 'express';

import { ScheduleType } from '@shared/enums/ScheduleType';

import { Time } from '../../../models/Time';

class TimesController {
  constructor(
    private createSpecificServiceSchedulesService: CreateSpecificServiceSchedulesService,
    private createDailyServiceSchedulesService: CreateDailyServiceSchedulesService,
    private createWeeklyServiceSchedulesService: CreateWeeklyServiceSchedulesService,
    private listServiceRuleService: ListServiceRuleService,
  ) {}

  public async create(request: Request, response: Response): Promise<Response> {
    const { day, day_of_week, intervals, type } = request.body;

    let time: Time;

    switch (type) {
      case ScheduleType.specific:
        time = await this.createSpecificServiceSchedulesService.execute({
          day,
          intervals,
          type,
        });

        break;
      case ScheduleType.weekly:
        time = await this.createWeeklyServiceSchedulesService.execute({
          intervals,
          type,
          dayOfWeek: day_of_week,
        });

        break;

      default:
        time = await this.createDailyServiceSchedulesService.execute({
          intervals,
          type,
        });
        break;
    }

    return response.json(time);
  }

  public async index(request: Request, response: Response): Promise<Response> {
    const times = this.listServiceRuleService.execute();

    return response.json(times);
  }
}

export { TimesController };
