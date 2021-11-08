import { ICreateTimeDTO } from '../dtos/ICreateTimeDTO';
import { Time } from '../models/Time';

interface ITimesRepository {
  index(): Time[];
  findById(id: string): Time | undefined;
  findDifferentTypesSchedules(type: string): Time | undefined;
  findByDate(date: string): Time | undefined;
  create(data: ICreateTimeDTO): Time;
  save(user: Time): Time;
  remove(user: Time): void;
}

export { ITimesRepository };
