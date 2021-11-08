import { ScheduleType } from '@shared/enums/ScheduleType';
import { AppError } from '@shared/errors/AppError';

import { TimesRepository } from '../repositories/implementations/TimesRepository';
import { DeleteServiceRuleService } from './DeleteServiceRuleService';

let timesRepository: TimesRepository;
let deleteServiceRuleService: DeleteServiceRuleService;

describe('DeleteServiceRuleService', () => {
  beforeEach(() => {
    timesRepository = new TimesRepository();

    deleteServiceRuleService = new DeleteServiceRuleService(timesRepository);
  });

  it('should be able to delete service schedule', async () => {
    const time = timesRepository.create({
      intervals: [{ start: '08:00', end: '10:00' }],
      type: ScheduleType.daily,
    });

    const spyMethodRemove = jest.spyOn(timesRepository, 'remove');

    deleteServiceRuleService.execute({
      timeId: time.id,
    });

    expect(spyMethodRemove).toBeCalled();
  });

  it('should not be able to delete service schedule if does not exist', async () => {
    const response = deleteServiceRuleService.execute({
      timeId: 'non-existing-time',
    });

    await expect(response).rejects.toBeInstanceOf(AppError);
  });
});
