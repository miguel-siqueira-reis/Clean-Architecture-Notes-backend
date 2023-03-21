import { ServerError } from '../Errors/ServerError';
import { HttpResponse } from '../Protocols/Http';

export const BadRequest = (error: Error): HttpResponse => {
  return {
    statusCode: 400,
    body: {
      message: error.message,
      name: error.name
    }
  };
};

export const ServerErrorResponse = (error: Error): HttpResponse => {
  return {
    statusCode: 500,
    body: new ServerError(error.stack)
  };
};

export const Success = (body: object): HttpResponse => {
  return {
    statusCode: 200,
    body
  };
};

export const ClientError = (error: Error): HttpResponse => {
  return {
    statusCode: 404,
    body: error
  };
};
