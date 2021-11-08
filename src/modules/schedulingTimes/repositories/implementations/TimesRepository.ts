import { ICreateTimeDTO } from '@modules/schedulingTimes/dtos/ICreateTimeDTO';
import { ITimesRepository } from '@modules/schedulingTimes/repositories/ITimesRepository';

import { Time } from '../../models/Time';

class TimesRepository implements ITimesRepository {
  private times: Time[] = [];

  private static INSTANCE: TimesRepository;

  public static getInstance(): TimesRepository {
    if (!TimesRepository.INSTANCE) {
      TimesRepository.INSTANCE = new TimesRepository();
    }

    return TimesRepository.INSTANCE;
  }

  public index(): Time[] {
    return this.times;
  }

  public findById(id: string): Time | undefined {
    const time = this.times.find(findTime => findTime.id === id);

    return time;
  }

  public findDifferentTypesSchedules(type: string): Time | undefined {
    const time = this.times.find(findTime => findTime.type !== type);

    return time;
  }

  public findByDate(date: string): Time | undefined {
    const time = this.times.find(findTime => findTime.day === date);

    return time;
  }

  public create({ day, dayOfWeek, intervals, type }: ICreateTimeDTO): Time {
    const time = new Time();

    Object.assign(time, { day, day_of_week: dayOfWeek, intervals, type });

    this.times.push(time);

    return time;
  }

  public save(time: Time): Time {
    const timeIndex = this.times.findIndex(findTime => findTime.id === time.id);

    this.times[timeIndex] = time;

    return time;
  }

  public remove(time: Time): void {
    const timeIndex = this.times.findIndex(findTime => findTime.id === time.id);

    this.times.splice(timeIndex, 1);
  }
}

export { TimesRepository };
