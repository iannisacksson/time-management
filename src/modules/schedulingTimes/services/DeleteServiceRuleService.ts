import { AppError } from '@shared/errors/AppError';

import { ITimesRepository } from '../repositories/ITimesRepository';

interface IRequest {
  timeId: string;
}

class DeleteServiceRuleService {
  constructor(private timesRepository: ITimesRepository) {}

  public async execute({ timeId }: IRequest): Promise<void> {
    const time = this.timesRepository.findById(timeId);

    if (!time) {
      throw new AppError('Horário de atendimento não encontrado', 404);
    }

    this.timesRepository.remove(time);
  }
}

export { DeleteServiceRuleService };
