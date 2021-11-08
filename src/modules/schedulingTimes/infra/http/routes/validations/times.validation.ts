import { Joi, Segments, celebrate } from 'celebrate';

import { DayOfTheWeek } from '@shared/enums/DayOfTheWeek';
import { ScheduleType } from '@shared/enums/ScheduleType';

export const id = celebrate({
  [Segments.PARAMS]: {
    id: Joi.string().uuid().required(),
  },
});

export const query = celebrate({
  [Segments.QUERY]: {
    start_date: Joi.string().required(),
    end_date: Joi.string().required(),
  },
});

export const create = celebrate({
  [Segments.BODY]: {
    day: Joi.date(),
    day_of_week: Joi.array().items(
      Joi.valid(
        DayOfTheWeek.sunday,
        DayOfTheWeek.monday,
        DayOfTheWeek.tuesday,
        DayOfTheWeek.wednesday,
        DayOfTheWeek.thursday,
        DayOfTheWeek.friday,
        DayOfTheWeek.saturday,
      ),
    ),
    intervals: Joi.array().items(
      Joi.object({
        start: Joi.string().required(),
        end: Joi.string().required(),
      }),
    ),
    type: Joi.string()
      .valid(ScheduleType.daily, ScheduleType.specific, ScheduleType.weekly)
      .required(),
  },
});
