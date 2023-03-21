import { SignUpController } from '../../../Presentation/Controllers/SignUp/SignUpController';
import { Controller } from '../../../Presentation/Protocols/Controller';

export const makeSingupController = (): Controller => {
  const validation;

  return new SignUpController();
};
