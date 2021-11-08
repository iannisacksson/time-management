import { Time } from '../models/Time';
import { ITimesRepository } from '../repositories/ITimesRepository';

class ListServiceRuleService {
  constructor(private timesRepository: ITimesRepository) {}

  public execute(): Time[] {
    const times = this.timesRepository.index();

    return times;
  }
}

export { ListServiceRuleService };
