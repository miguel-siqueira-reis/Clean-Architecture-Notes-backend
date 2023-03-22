import { SignUpController } from '../../../Presentation/Controllers/SignUp/SignUpController';
import { Controller } from '../../../Presentation/Protocols/Controller';
import { ValidationSignUpController } from '../../Validations/ValidationSignUpController';
import { makeAddUser } from '../useCases/addUserFactory';

export const makeSingupController = (): Controller => {
  const validation = new ValidationSignUpController();
  const addUserUseCase = makeAddUser();

  return new SignUpController(validation, addUserUseCase);
};
