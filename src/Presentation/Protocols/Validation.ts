import { IEither } from '../../Domain/UseCases/Errors/Either';

export interface Validation {
  validate(input: any): Validation.Response;
}

export namespace Validation {
  export type Response = IEither<Error, null>;
}
