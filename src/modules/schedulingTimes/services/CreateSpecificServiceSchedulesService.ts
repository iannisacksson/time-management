import { isBefore, format } from 'date-fns';

import { ScheduleType } from '@shared/enums/ScheduleType';
import { AppError } from '@shared/errors/AppError';
import { IIntervals } from '@shared/interfaces/IIntervals';

import { Time } from '../models/Time';
import { ITimesRepository } from '../repositories/ITimesRepository';

interface IRequest {
  day?: Date;
  intervals: IIntervals[];
  type: ScheduleType;
}

class CreateSpecificServiceSchedulesService {
  constructor(private timesRepository: ITimesRepository) {}

  public async execute({ type, intervals, day }: IRequest): Promise<Time> {
    const otherTypeScheduleAlreadyExist = this.timesRepository.findDifferentTypesSchedules(
      type,
    );

    if (otherTypeScheduleAlreadyExist) {
      throw new AppError('Já foi adicionado outro tipo de horário');
    }

    if (!day) {
      throw new AppError('Informe uma data específica.');
    }

    if (isBefore(day, new Date(Date.now()))) {
      throw new AppError('Não é possível cadastrar com horas passadas.');
    }

    const formattedDate = format(day, 'dd-MM-yyyy');

    const busyDate = this.timesRepository.findByDate(formattedDate);

    if (busyDate) {
      throw new AppError('Data ocupada.');
    }

    if (!intervals.length) {
      throw new AppError('Informe o intervalo de atendimento.');
    }

    const newTime = this.timesRepository.create({
      day: formattedDate,
      intervals,
      type,
    });

    return newTime;
  }
}

export { CreateSpecificServiceSchedulesService };
