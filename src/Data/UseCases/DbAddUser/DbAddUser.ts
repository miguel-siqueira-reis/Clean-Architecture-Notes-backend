import { AddUser } from '../../../Domain/UseCases/AddUser';
import { AddUserRepository } from '../../Protocols/AddUserRepository';
import { FindByUserRepository } from '../../Protocols/FindByUserRepository';
import { Either } from '../Errors/Either';
import { EmailAlreadyExists } from '../Errors/EmailAlreadyExists';

export class DbAddUser implements AddUser {
  constructor(
    private addUserRepository: AddUserRepository,
    private findByUserRepository: FindByUserRepository
  ) {}

  public async add({ name, email, password }: AddUser.Request): AddUser.Response {
    const user = await this.findByUserRepository.findBy('email', email);
    if (user) {
      return Either.left(new EmailAlreadyExists());
    }

    const res = await this.addUserRepository.add({
      name,
      email,
      password
    });

    return Either.right(res);
  }
}
