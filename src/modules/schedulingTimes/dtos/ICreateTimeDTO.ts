import { DayOfTheWeek } from '@shared/enums/DayOfTheWeek';
import { ScheduleType } from '@shared/enums/ScheduleType';
import { IIntervals } from '@shared/interfaces/IIntervals';

interface ICreateTimeDTO {
  type: ScheduleType;

  day?: string;

  intervals: IIntervals[];

  dayOfWeek?: DayOfTheWeek[];
}

export { ICreateTimeDTO };
