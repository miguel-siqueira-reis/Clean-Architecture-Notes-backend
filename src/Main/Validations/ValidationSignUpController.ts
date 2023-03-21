import { Either } from '../../Data/UseCases/Errors/Either';
import { Validation } from '../../Presentation/Protocols/Validation';

export class ValidationSignUpController implements Validation {
  validate(input: any): Validation.Response {
    return Either.right(null);
  }
}
