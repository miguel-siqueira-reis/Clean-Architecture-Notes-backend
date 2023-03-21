import { Errors } from '../../../Domain/UseCases/Errors/Errors';

export class EmailAlreadyExists implements Errors {
  name: string;
  message: string;

  constructor(message?: string) {
    this.name = 'EmailAlreadyExists';
    this.message = message || 'Email já cadastrado';
  }
}
