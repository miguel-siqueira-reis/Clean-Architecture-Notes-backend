import z from 'zod';
import { Either } from '../../Data/UseCases/Errors/Either';
import { SignUpController } from '../../Presentation/Controllers/SignUp/SignUpController';
import { Validation } from '../../Presentation/Protocols/Validation';

export class ValidationSignUpController implements Validation {
  validate(input: SignUpController.Request): Validation.Response {
    const schemaValidation = z
      .object({
        name: z.string(),
        email: z.string().email(),
        password: z.string().min(6).max(255),
        password_confirmation: z.string().min(6).max(255)
      })
      .refine((data) => data.password === data.password_confirmation, {
        message: 'A Senha e a Confirmação de Senha devem ser iguais'
      });

    const result = schemaValidation.safeParse(input);

    if (result.success) {
      return Either.right(null);
    }

    return Either.left(new Error(result.error.issues[0].message));
  }
}
