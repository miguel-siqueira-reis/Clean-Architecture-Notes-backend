export class ServerError extends Error {
  public message: string;

  constructor(stack?: string) {
    super();
    this.message = 'Erro interno do servidor.';
    this.name = 'ServerError';
    this.stack = stack;
  }
}
