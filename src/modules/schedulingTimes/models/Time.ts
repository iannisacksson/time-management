import { v4 as uuidv4 } from 'uuid';

import { DayOfTheWeek } from '@shared/enums/DayOfTheWeek';
import { ScheduleType } from '@shared/enums/ScheduleType';
import { IIntervals } from '@shared/interfaces/IIntervals';

class Time {
  id: string;

  type: ScheduleType;

  day: string;

  intervals: IIntervals[];

  day_of_week: DayOfTheWeek[];

  created_at: Date;

  updated_at: Date;

  constructor() {
    if (!this.id) {
      this.id = uuidv4();
    }
  }
}

export { Time };
