import { ScheduleType } from '@shared/enums/ScheduleType';
import { AppError } from '@shared/errors/AppError';

import { TimesRepository } from '../repositories/implementations/TimesRepository';
import { CreateDailyServiceSchedulesService } from './CreateDailyServiceSchedulesService';

let timesRepository: TimesRepository;
let createServiceRuleService: CreateDailyServiceSchedulesService;

describe('CreateDailyServiceSchedulesService', () => {
  beforeEach(() => {
    timesRepository = new TimesRepository();

    createServiceRuleService = new CreateDailyServiceSchedulesService(
      timesRepository,
    );
  });

  it('should be able to register daily office hours', async () => {
    const time = await createServiceRuleService.execute({
      intervals: [{ start: '08:00', end: '12:00' }],
      type: ScheduleType.daily,
    });

    expect(time).toHaveProperty('id');
    expect(time.type).toEqual(ScheduleType.daily);
    expect(time.intervals).toEqual([{ start: '08:00', end: '12:00' }]);
  });

  it('should not be able to register daily appointment times if there are already registered times', async () => {
    timesRepository.create({
      intervals: [{ start: '08:00', end: '12:00' }],
      type: ScheduleType.daily,
    });

    await expect(
      createServiceRuleService.execute({
        intervals: [{ start: '08:00', end: '12:00' }],
        type: ScheduleType.daily,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to register daily service hours if the times are not informed', async () => {
    await expect(
      createServiceRuleService.execute({
        intervals: [],
        type: ScheduleType.daily,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
