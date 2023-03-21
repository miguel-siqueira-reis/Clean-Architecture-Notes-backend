import { IEither } from './Errors/Either';
import { Errors } from './Errors/Errors';

export interface AddUser {
  add(accountUser: AddUser.Request): AddUser.Response;
}

export namespace AddUser {
  export type Request = {
    name: string;
    email: string;
    password: string;
    password_confirmation: string;
  };

  export type Response = Promise<
    IEither<
      Errors,
      {
        id: number;
        name: string;
        email: string;
      }
    >
  >;
}
