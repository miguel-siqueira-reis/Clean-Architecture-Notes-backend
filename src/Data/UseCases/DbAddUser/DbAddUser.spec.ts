import { describe, expect, it, vi } from 'vitest';
import { AddUserRepository } from '../../Protocols/AddUserRepository';
import { EncryptPassword } from '../../Protocols/EncryptPassword';
import { FindByUserRepository } from '../../Protocols/FindByUserRepository';
import { Either } from '../Errors/Either';
import { EmailAlreadyExists } from '../Errors/EmailAlreadyExists';
import { DbAddUser } from './DbAddUser';

const makeAddUserRepositoryStub = () => {
  class addUserRepositoryStub implements AddUserRepository {
    async add({ name, email }: AddUserRepository.Request): AddUserRepository.Response {
      return {
        id: 1,
        name,
        email
      };
    }
  }

  return new addUserRepositoryStub();
};

const makeFindByUserRepository = () => {
  class FindByUserRepositoryStub implements FindByUserRepository {
    async findBy(): FindByUserRepository.Response {
      return null;
    }
  }

  return new FindByUserRepositoryStub();
};

const makeEncryptPasswordStub = () => {
  class EncryptPasswordStub implements EncryptPassword {
    async encrypt(password: string) {
      return 'encrypt_password';
    }
  }

  return new EncryptPasswordStub();
};

const makeSut = () => {
  const encryptPasswordStub = makeEncryptPasswordStub();
  const addUserRepositoryStub = makeAddUserRepositoryStub();
  const findByUserRepositoryStub = makeFindByUserRepository();
  const sut = new DbAddUser(addUserRepositoryStub, findByUserRepositoryStub, encryptPasswordStub);

  return {
    sut,
    addUserRepositoryStub,
    findByUserRepositoryStub,
    encryptPasswordStub
  };
};

const makeFakeUser = () => ({
  name: 'valid_name',
  email: 'valid_email',
  password: 'valid_password',
  password_confirmation: 'valid_password_confirmation'
});

describe('DbAddUser Test', () => {
  it('should call method add on repository with right params', async () => {
    const { sut, addUserRepositoryStub } = makeSut();

    const userRepositorySpy = vi.spyOn(addUserRepositoryStub, 'add');

    const user = makeFakeUser();
    await sut.add(user);

    expect(userRepositorySpy).toBeCalledWith({
      name: user.name,
      email: user.email,
      password: 'encrypt_password'
    });
  });

  it('should returns user if success', async () => {
    const { sut } = makeSut();

    const user = makeFakeUser();

    const res = await sut.add(user);

    expect(res).toEqual(
      Either.right({
        id: 1,
        name: user.name,
        email: user.email
      })
    );
  });

  it('should provid all params to findByEmail resposigory', async () => {
    const { sut, findByUserRepositoryStub } = makeSut();

    const findByUserRepositorySpy = vi.spyOn(findByUserRepositoryStub, 'findBy');

    const user = makeFakeUser();
    await sut.add(user);

    expect(findByUserRepositorySpy).toBeCalledWith('email', user.email);
  });

  it('should returns EmailAlreadyExists if email already exists', async () => {
    const { sut, findByUserRepositoryStub } = makeSut();

    const user = makeFakeUser();

    vi.spyOn(findByUserRepositoryStub, 'findBy').mockImplementationOnce(() =>
      Promise.resolve({
        id: 1,
        name: user.name,
        email: user.email,
        password: user.password
      })
    );

    const res = await sut.add(user);

    expect(res).toEqual(Either.left(new EmailAlreadyExists()));
  });

  it('should provider right params to encryptPassword', async () => {
    const { sut, encryptPasswordStub } = makeSut();

    const encryptPasswordSpy = vi.spyOn(encryptPasswordStub, 'encrypt');

    const user = makeFakeUser();
    await sut.add(user);

    expect(encryptPasswordSpy).toBeCalledWith(user.password);
  });
});
