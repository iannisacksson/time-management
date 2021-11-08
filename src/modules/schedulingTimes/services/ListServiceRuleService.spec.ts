import { TimesRepository } from '../repositories/implementations/TimesRepository';
import { ListServiceRuleService } from './ListServiceRuleService';

let timesRepository: TimesRepository;
let listServiceRuleService: ListServiceRuleService;

describe('ListServiceRuleService', () => {
  beforeEach(() => {
    timesRepository = new TimesRepository();

    listServiceRuleService = new ListServiceRuleService(timesRepository);
  });

  it('should be able to record specific office hours', async () => {
    const spyMethodIndex = jest.spyOn(timesRepository, 'index');

    listServiceRuleService.execute();

    expect(spyMethodIndex).toBeCalled();
  });
});
