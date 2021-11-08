import { DayOfTheWeek } from '@shared/enums/DayOfTheWeek';
import { ScheduleType } from '@shared/enums/ScheduleType';
import { AppError } from '@shared/errors/AppError';
import { IIntervals } from '@shared/interfaces/IIntervals';

import { Time } from '../models/Time';
import { ITimesRepository } from '../repositories/ITimesRepository';

interface IRequest {
  dayOfWeek: DayOfTheWeek[];
  intervals: IIntervals[];
  type: ScheduleType;
}

class CreateWeeklyServiceSchedulesService {
  constructor(private timesRepository: ITimesRepository) {}

  public async execute({
    type,
    intervals,
    dayOfWeek,
  }: IRequest): Promise<Time> {
    const times = this.timesRepository.index();

    const otherTypeScheduleAlreadyExist = times.find(
      findTime => findTime.type !== type,
    );

    if (otherTypeScheduleAlreadyExist) {
      throw new AppError('Já foi adicionado outro tipo de horário');
    }

    if (!dayOfWeek || !dayOfWeek.length) {
      throw new AppError('Informe os dias da semana de atendimento.');
    }

    const dayOfWeekWithoutDuplicate = dayOfWeek.filter(
      (filterDayOfWeek, index) => dayOfWeek.indexOf(filterDayOfWeek) === index,
    );

    times.forEach(findTime => {
      const busyWeekday = findTime.day_of_week.find(findDayOfWeek =>
        dayOfWeekWithoutDuplicate.includes(findDayOfWeek),
      );

      if (busyWeekday) {
        throw new AppError('Dia da semana já tem horário preenchido');
      }
    });

    if (!intervals || !intervals.length) {
      throw new AppError('Informe o intervalo de atendimento.');
    }

    const newTime = this.timesRepository.create({
      dayOfWeek: dayOfWeekWithoutDuplicate,
      intervals,
      type,
    });

    return newTime;
  }
}

export { CreateWeeklyServiceSchedulesService };
