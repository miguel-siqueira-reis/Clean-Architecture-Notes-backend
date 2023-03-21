import { AddUser } from '../../../Domain/UseCases/AddUser';
import { BadRequest, ClientError, ServerErrorResponse, Success } from '../../Helpers/HttpHelper';
import { Controller } from '../../Protocols/Controller';
import { HttpRequest } from '../../Protocols/Http';
import { Validation } from '../../Protocols/Validation';

interface SignUpControllerRequest {
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
}

export class SignUpController implements Controller {
  constructor(private validation: Validation, private addUser: AddUser) {}

  public async handle(req: HttpRequest<SignUpControllerRequest>) {
    try {
      const { name, email, password, password_confirmation } = req.body;

      const error = this.validation.validate(req.body);
      if (error.isLeft()) {
        return BadRequest(error.left());
      }

      const userOrError = await this.addUser.add({
        name,
        email,
        password,
        password_confirmation
      });

      if (userOrError.isLeft()) {
        return ClientError(userOrError.left());
      }

      return Success(userOrError.right());
    } catch (error) {
      return ServerErrorResponse(error as Error);
    }
  }
}
