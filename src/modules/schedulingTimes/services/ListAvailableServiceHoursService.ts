import {
  format,
  differenceInDays,
  getDay,
  addDays,
  getTime,
  parseISO,
} from 'date-fns';

import { DayOfTheWeek } from '@shared/enums/DayOfTheWeek';
import { ScheduleType } from '@shared/enums/ScheduleType';
import { IIntervals } from '@shared/interfaces/IIntervals';

import { ITimesRepository } from '../repositories/ITimesRepository';

interface IRequest {
  startDate: string;
  endDate: string;
}

interface IPeriod {
  date?: Date;
  day: string;
  day_of_week?: DayOfTheWeek;
  intervals: IIntervals[];
}

class ListAvailableServiceHoursService {
  constructor(private timesRepository: ITimesRepository) {}

  public execute({ startDate, endDate }: IRequest): IPeriod[] {
    const times = this.timesRepository.index();

    if (!times.length) {
      return [];
    }

    const parsedStartDate = parseISO(startDate);
    const parsedEndDate = parseISO(endDate);

    const formattedStartDate = format(parsedStartDate, 'dd-MM-yyyy');
    const formattedEndDate = format(parsedEndDate, 'dd-MM-yyyy');

    const { type } = times[0];

    switch (type) {
      case ScheduleType.specific: {
        const timesAvailables = times.filter(
          time =>
            time.day >= formattedStartDate && time.day <= formattedEndDate,
        );

        const avalability = timesAvailables.map(
          (period): IPeriod => {
            return {
              day: period.day,
              intervals: period.intervals,
            };
          },
        );

        return avalability;
      }

      case ScheduleType.weekly: {
        const differenceDates = differenceInDays(
          parsedEndDate,
          parsedStartDate,
        );

        const eachDayArray = Array.from(
          { length: differenceDates + 1 },
          (_, index) => addDays(parsedStartDate, index),
        );

        const period = eachDayArray.map(
          (date): IPeriod => {
            const dayOfWeek = getDay(date);

            return {
              date,
              day: format(date, 'dd-MM-yyyy'),
              day_of_week: dayOfWeek,
              intervals: [],
            };
          },
        );

        const avalability: IPeriod[] = [];

        times.forEach(time => {
          time.day_of_week.forEach(dayOfWeek => {
            const filteredPeriod = period.filter(
              item => item.day_of_week === dayOfWeek,
            );

            filteredPeriod.forEach(period =>
              period.intervals.push(...time.intervals),
            );

            avalability.push(...filteredPeriod);
          });
        });

        const sortAvalability = avalability
          .sort(
            (periodA, periodB) =>
              getTime(periodA.date as Date) - getTime(periodB.date as Date),
          )
          .map(item => {
            delete item.date;
            delete item.day_of_week;

            return item;
          });

        return sortAvalability;
      }

      default: {
        const differenceDates = differenceInDays(
          parsedEndDate,
          parsedStartDate,
        );

        const eachDayArray = Array.from(
          { length: differenceDates + 1 },
          (_, index) => addDays(parsedStartDate, index),
        );

        const period = eachDayArray.map(
          (date): IPeriod => {
            return {
              day: format(date, 'dd-MM-yyyy'),
              intervals: [],
            };
          },
        );

        times.forEach(time => {
          period.forEach(item => item.intervals.push(...time.intervals));
        });

        return period;
      }
    }
  }
}

export { ListAvailableServiceHoursService };
