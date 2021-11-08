import { ScheduleType } from '@shared/enums/ScheduleType';
import { AppError } from '@shared/errors/AppError';

import { TimesRepository } from '../repositories/implementations/TimesRepository';
import { CreateSpecificServiceSchedulesService } from './CreateSpecificServiceSchedulesService';

let timesRepository: TimesRepository;
let createSpecificServiceSchedulesService: CreateSpecificServiceSchedulesService;

describe('CreateSpecificServiceSchedulesService', () => {
  beforeEach(() => {
    timesRepository = new TimesRepository();

    createSpecificServiceSchedulesService = new CreateSpecificServiceSchedulesService(
      timesRepository,
    );
  });

  it('should be able to record specific office hours', async () => {
    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2021, 11, 6).getTime();
    });

    const time = await createSpecificServiceSchedulesService.execute({
      intervals: [{ start: '08:00', end: '12:00' }],
      type: ScheduleType.specific,
      day: new Date(2021, 11, 7),
    });

    expect(time).toHaveProperty('id');
    expect(time.type).toEqual(ScheduleType.specific);
    expect(time.day).toEqual('07-12-2021');
    expect(time.intervals).toEqual([{ start: '08:00', end: '12:00' }]);
  });

  it('should not be able to record specific office hours if another type of time has already been added', async () => {
    timesRepository.create({
      intervals: [{ start: '08:00', end: '12:00' }],
      type: ScheduleType.daily,
    });

    await expect(
      createSpecificServiceSchedulesService.execute({
        intervals: [{ start: '08:00', end: '12:00' }],
        type: ScheduleType.specific,
        day: new Date(2021, 11, 7),
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to record the specific office hours if the date has not been entered', async () => {
    const response = createSpecificServiceSchedulesService.execute({
      intervals: [],
      type: ScheduleType.daily,
    });

    await expect(response).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to record specific office hours if the date is passed', async () => {
    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2021, 11, 6).getTime();
    });

    const response = createSpecificServiceSchedulesService.execute({
      intervals: [],
      type: ScheduleType.daily,
      day: new Date(2021, 11, 5),
    });

    await expect(response).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to record specific office hours if the date is busy', async () => {
    timesRepository.create({
      intervals: [{ start: '08:00', end: '12:00' }],
      type: ScheduleType.specific,
      day: '07-12-2021',
    });

    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2021, 11, 6).getTime();
    });

    const response = createSpecificServiceSchedulesService.execute({
      intervals: [],
      type: ScheduleType.specific,
      day: new Date(2021, 11, 7),
    });

    await expect(response).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to record the specific service hours if you do not enter the service interval', async () => {
    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2021, 11, 6).getTime();
    });

    const response = createSpecificServiceSchedulesService.execute({
      intervals: [],
      type: ScheduleType.specific,
      day: new Date(2021, 11, 7),
    });

    await expect(response).rejects.toBeInstanceOf(AppError);
  });
});
