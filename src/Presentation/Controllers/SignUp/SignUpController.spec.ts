import { describe, expect, it, vi } from 'vitest';
import { Either } from '../../../Data/UseCases/Errors/Either';
import { AddUser } from '../../../Domain/UseCases/AddUser';
import { InvalidParamError } from '../../Errors/InvalidPramError';
import { ServerError } from '../../Errors/ServerError';
import { BadRequest } from '../../Helpers/HttpHelper';
import { Validation } from '../../Protocols/Validation';
import { SignUpController } from './SignUpController';

const makeValidtionStub = () => {
  class ValidationStub implements Validation {
    validate(input: any): Error | null {
      return null;
    }
  }
  return new ValidationStub();
};

const makeFakeAddUser = () => {
  class AddUserStub implements AddUser {
    async add(addUser: AddUser.Request): AddUser.Response {
      return Either.right({
        id: 1,
        name: addUser.name,
        email: addUser.email
      });
    }
  }

  return new AddUserStub();
};

const makeSut = () => {
  const validationStub = makeValidtionStub();
  const addUserStub = makeFakeAddUser();

  return {
    sut: new SignUpController(validationStub, addUserStub),
    validationStub,
    addUserStub
  };
};

const makeFakeRequest = () => {
  return {
    body: {
      name: 'valid_name',
      email: 'valid_email@email.com',
      password: 'valid_password',
      password_confirmation: 'valid_password_confirmation'
    }
  };
};

const makeFakeAccount = () => {
  return {
    id: 1,
    name: 'valid_name',
    email: 'valid_email@email.com'
  };
};

describe('SignUpController', () => {
  it('should be returns 200 if valid params provider', async () => {
    const { sut } = makeSut();

    const req = makeFakeRequest();

    const response = await sut.handle(req);

    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual(makeFakeAccount());
  });

  it('should be returns invalidParamError on Email param if email invalid provider', async () => {
    const { sut, validationStub } = makeSut();

    vi.spyOn(validationStub, 'validate').mockReturnValueOnce(
      new InvalidParamError('Parametro email é invalido')
    );

    const req = makeFakeRequest();
    const response = await sut.handle({
      body: {
        ...req.body,
        email: 'invalid_email'
      }
    });

    expect(response.statusCode).toBe(400);
    expect(response).toEqual(BadRequest(new InvalidParamError('Parametro email é invalido')));
  });

  it('should be returns invalidParamError on name param if name invalid provider', async () => {
    const { sut, validationStub } = makeSut();

    vi.spyOn(validationStub, 'validate').mockReturnValueOnce(
      new InvalidParamError('Parametro name é invalido')
    );

    const req = makeFakeRequest();
    const response = await sut.handle({
      body: {
        ...req.body,
        name: 'invalid_name'
      }
    });

    expect(response.statusCode).toBe(400);
    expect(response).toEqual(BadRequest(new InvalidParamError('Parametro name é invalido')));
  });

  it('should be returns invalidParamError on password param if password invalid provider', async () => {
    const { sut, validationStub } = makeSut();

    vi.spyOn(validationStub, 'validate').mockReturnValueOnce(
      new InvalidParamError('Parametro password é invalido')
    );

    const req = makeFakeRequest();
    const response = await sut.handle({
      body: {
        ...req.body,
        password: 'invalid_password'
      }
    });

    expect(response.statusCode).toBe(400);
    expect(response).toEqual(BadRequest(new InvalidParamError('Parametro password é invalido')));
  });

  it('should be returns invalidParamError on password_confirmation param if password_confirmation invalid provider', async () => {
    const { sut, validationStub } = makeSut();

    vi.spyOn(validationStub, 'validate').mockReturnValueOnce(
      new InvalidParamError('Parametro password_confirmation é invalido')
    );

    const req = makeFakeRequest();
    const response = await sut.handle({
      body: {
        ...req.body,
        password_confirmation: 'invalid_password'
      }
    });

    expect(response.statusCode).toBe(400);
    expect(response).toEqual(
      BadRequest(new InvalidParamError('Parametro password_confirmation é invalido'))
    );
  });

  it('should returns 500 if validations throw error', async () => {
    const { sut, validationStub } = makeSut();

    vi.spyOn(validationStub, 'validate').mockImplementationOnce(() => {
      throw new Error();
    });

    const response = await sut.handle(makeFakeRequest());

    expect(response.statusCode).toBe(500);
    expect(response.body).toEqual(new ServerError());
  });

  it('should returns 500 if addUser throw Error', async () => {
    const { sut, addUserStub } = makeSut();

    vi.spyOn(addUserStub, 'add').mockImplementationOnce(() => {
      throw new Error();
    });

    const res = await sut.handle(makeFakeRequest());

    expect(res.statusCode).toBe(500);
    expect(res.body).toEqual(new ServerError());
  });

  it('should provider all params correct to validation method validate and returns status code 200', async () => {
    const { sut, validationStub } = makeSut();

    const validationSpy = vi.spyOn(validationStub, 'validate');

    const req = makeFakeRequest();
    const res = await sut.handle(req);

    expect(validationSpy).toBeCalledWith(req.body);
    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual(makeFakeAccount());
  });

  it('should provider all correct params to add method in class AddUser and returns status code 200', async () => {
    const { sut, addUserStub } = makeSut();

    const addUserSpy = vi.spyOn(addUserStub, 'add');

    const req = makeFakeRequest();
    const res = await sut.handle(req);

    expect(addUserSpy).toBeCalledWith(req.body);
    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual(makeFakeAccount());
  });
});
