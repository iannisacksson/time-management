import { DayOfTheWeek } from '@shared/enums/DayOfTheWeek';
import { ScheduleType } from '@shared/enums/ScheduleType';

import { TimesRepository } from '../repositories/implementations/TimesRepository';
import { ListAvailableServiceHoursService } from './ListAvailableServiceHoursService';

let timesRepository: TimesRepository;
let listAvailableServiceHoursService: ListAvailableServiceHoursService;

describe('ListAvailableServiceHoursService', () => {
  beforeEach(() => {
    timesRepository = new TimesRepository();

    listAvailableServiceHoursService = new ListAvailableServiceHoursService(
      timesRepository,
    );
  });

  it('should be able to show available times of daily schedules', async () => {
    timesRepository.create({
      type: ScheduleType.daily,
      intervals: [{ start: '08:00', end: '12:00' }],
    });

    const availability = listAvailableServiceHoursService.execute({
      startDate: '2021-11-07',
      endDate: '2021-11-10',
    });

    expect(availability.length).toEqual(4);
    expect(availability).toEqual(
      expect.arrayContaining([
        { day: '07-11-2021', intervals: [{ start: '08:00', end: '12:00' }] },
        { day: '08-11-2021', intervals: [{ start: '08:00', end: '12:00' }] },
        { day: '09-11-2021', intervals: [{ start: '08:00', end: '12:00' }] },
        { day: '10-11-2021', intervals: [{ start: '08:00', end: '12:00' }] },
      ]),
    );
  });

  it('should be able to show available times of weekly times', async () => {
    timesRepository.create({
      type: ScheduleType.weekly,
      dayOfWeek: [DayOfTheWeek.friday, DayOfTheWeek.monday],
      intervals: [{ start: '08:00', end: '12:00' }],
    });

    const availability = listAvailableServiceHoursService.execute({
      startDate: '2021-11-07',
      endDate: '2021-11-10',
    });

    expect(availability.length).toEqual(1);
    expect(availability).toEqual(
      expect.arrayContaining([
        { day: '08-11-2021', intervals: [{ start: '08:00', end: '12:00' }] },
      ]),
    );
  });

  it('should be able to show available times for specific times', async () => {
    timesRepository.create({
      type: ScheduleType.specific,
      day: '07-11-2021',
      intervals: [{ start: '08:00', end: '12:00' }],
    });

    timesRepository.create({
      type: ScheduleType.specific,
      day: '09-11-2021',
      intervals: [{ start: '08:00', end: '12:00' }],
    });

    timesRepository.create({
      type: ScheduleType.specific,
      day: '12-11-2021',
      intervals: [{ start: '08:00', end: '12:00' }],
    });

    const availability = listAvailableServiceHoursService.execute({
      startDate: '2021-11-07',
      endDate: '2021-11-10',
    });

    expect(availability.length).toEqual(2);
    expect(availability).toEqual(
      expect.arrayContaining([
        { day: '07-11-2021', intervals: [{ start: '08:00', end: '12:00' }] },
        { day: '09-11-2021', intervals: [{ start: '08:00', end: '12:00' }] },
      ]),
    );
  });

  it('should not be able to show available times if they do not exist', async () => {
    const availability = listAvailableServiceHoursService.execute({
      startDate: '2021-11-07',
      endDate: '2021-11-10',
    });

    expect(availability.length).toEqual(0);
  });
});
