export interface AddUserRepository {
  add(user: AddUserRepository.Request): AddUserRepository.Response;
}

export namespace AddUserRepository {
  export type Request = {
    name: string;
    email: string;
    password: string;
  };

  export type Response = Promise<{
    id: number;
    name: string;
    email: string;
  }>;
}
