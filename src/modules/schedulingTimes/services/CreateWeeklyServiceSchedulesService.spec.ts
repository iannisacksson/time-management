import { DayOfTheWeek } from '@shared/enums/DayOfTheWeek';
import { ScheduleType } from '@shared/enums/ScheduleType';
import { AppError } from '@shared/errors/AppError';

import { TimesRepository } from '../repositories/implementations/TimesRepository';
import { CreateWeeklyServiceSchedulesService } from './CreateWeeklyServiceSchedulesService';

let timesRepository: TimesRepository;
let createWeeklyServiceSchedulesService: CreateWeeklyServiceSchedulesService;

describe('CreateWeeklyServiceSchedulesService', () => {
  beforeEach(() => {
    timesRepository = new TimesRepository();

    createWeeklyServiceSchedulesService = new CreateWeeklyServiceSchedulesService(
      timesRepository,
    );
  });

  it('should be able to record specific office hours', async () => {
    const time = await createWeeklyServiceSchedulesService.execute({
      intervals: [{ start: '08:00', end: '12:00' }],
      type: ScheduleType.weekly,
      dayOfWeek: [DayOfTheWeek.monday, DayOfTheWeek.saturday],
    });

    expect(time).toHaveProperty('id');
    expect(time.type).toEqual(ScheduleType.weekly);
    expect(time.intervals).toEqual([{ start: '08:00', end: '12:00' }]);
    expect(time.day_of_week).toEqual([
      DayOfTheWeek.monday,
      DayOfTheWeek.saturday,
    ]);
  });

  it('should not be able to record specific office hours if another type of time already exists', async () => {
    timesRepository.create({
      intervals: [{ start: '08:00', end: '12:00' }],
      type: ScheduleType.daily,
    });

    const response = createWeeklyServiceSchedulesService.execute({
      intervals: [{ start: '08:00', end: '12:00' }],
      type: ScheduleType.specific,
      dayOfWeek: [DayOfTheWeek.monday, DayOfTheWeek.saturday],
    });

    await expect(response).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to record specific office hours if the day of the week has not been entered', async () => {
    const response = createWeeklyServiceSchedulesService.execute({
      intervals: [{ start: '08:00', end: '12:00' }],
      type: ScheduleType.specific,
      dayOfWeek: [],
    });

    await expect(response).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to record specific office hours if the day of the week is already busy', async () => {
    timesRepository.create({
      intervals: [{ start: '08:00', end: '12:00' }],
      type: ScheduleType.weekly,
      dayOfWeek: [DayOfTheWeek.saturday, DayOfTheWeek.sunday],
    });

    const response = createWeeklyServiceSchedulesService.execute({
      intervals: [{ start: '08:00', end: '12:00' }],
      type: ScheduleType.weekly,
      dayOfWeek: [DayOfTheWeek.saturday, DayOfTheWeek.thursday],
    });

    await expect(response).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to record specific office hours if break has not been entered', async () => {
    const response = createWeeklyServiceSchedulesService.execute({
      intervals: [],
      type: ScheduleType.weekly,
      dayOfWeek: [DayOfTheWeek.saturday, DayOfTheWeek.thursday],
    });

    await expect(response).rejects.toBeInstanceOf(AppError);
  });
});
