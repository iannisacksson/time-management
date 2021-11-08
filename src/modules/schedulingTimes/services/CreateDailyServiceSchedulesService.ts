import { ScheduleType } from '@shared/enums/ScheduleType';
import { AppError } from '@shared/errors/AppError';
import { IIntervals } from '@shared/interfaces/IIntervals';

import { Time } from '../models/Time';
import { ITimesRepository } from '../repositories/ITimesRepository';

interface IRequest {
  intervals: IIntervals[];
  type: ScheduleType;
}

class CreateDailyServiceSchedulesService {
  constructor(private timesRepository: ITimesRepository) {}

  public async execute({ type, intervals }: IRequest): Promise<Time> {
    const times = this.timesRepository.index();

    if (times.length) {
      throw new AppError('Já tem horários cadastrados.');
    }

    if (!intervals.length) {
      throw new AppError('Informe o intervalo de atendimento.');
    }

    const newTime = this.timesRepository.create({
      intervals,
      type,
    });

    return newTime;
  }
}

export { CreateDailyServiceSchedulesService };
