import { User } from '../../Domain/Models/User';

export interface FindByUserRepository {
  findBy(key: string | undefined, value: any): FindByUserRepository.Response;
}

export namespace FindByUserRepository {
  export type Response = Promise<User | null>;
}
