import { ListAvailableServiceHoursService } from '@modules/schedulingTimes/services/ListAvailableServiceHoursService';
import { Request, Response } from 'express';

class AvailableSchedulesController {
  constructor(
    private listAvailableServiceHoursService: ListAvailableServiceHoursService,
  ) {}

  public async index(request: Request, response: Response): Promise<Response> {
    const { start_date, end_date } = request.query;

    const times = this.listAvailableServiceHoursService.execute({
      startDate: start_date as string,
      endDate: end_date as string,
    });

    return response.json(times);
  }
}

export { AvailableSchedulesController };
