import { AddUser } from '../../../Domain/UseCases/AddUser';
import { AddUserRepository } from '../../Protocols/AddUserRepository';
import { EncryptPassword } from '../../Protocols/EncryptPassword';
import { FindByUserRepository } from '../../Protocols/FindByUserRepository';
import { Either } from '../Errors/Either';
import { EmailAlreadyExists } from '../Errors/EmailAlreadyExists';

export class DbAddUser implements AddUser {
  constructor(
    private addUserRepository: AddUserRepository,
    private findByUserRepository: FindByUserRepository,
    private encryptPassword: EncryptPassword
  ) {}

  public async add({ name, email, password }: AddUser.Request): AddUser.Response {
    const user = await this.findByUserRepository.findBy('email', email);
    if (user) {
      return Either.left(new EmailAlreadyExists());
    }

    const encryptPassword = await this.encryptPassword.encrypt(password);

    const res = await this.addUserRepository.add({
      name,
      email,
      password: encryptPassword
    });

    return Either.right(res);
  }
}
