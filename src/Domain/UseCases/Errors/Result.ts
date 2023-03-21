export interface IResult<T> {
  isSuccess: boolean;
  isFailure: boolean;
  error?: T | string;
  getValue(): T;

  ok<U>(value: U): IResult<U>;

  fail<U>(message: string): IResult<U>;
}
