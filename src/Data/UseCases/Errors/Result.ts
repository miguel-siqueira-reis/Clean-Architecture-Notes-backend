import { IResult } from '../../../Domain/UseCases/Errors/Result';

export class Result<T> implements IResult<T> {
  public isFailure: boolean;
  public isSuccess: boolean;
  public error?: T | string;
  private _value?: T;

  private constructor(isSuccess: boolean, error?: T | string, value?: T) {
    if (isSuccess && error) {
      throw new Error('InvalidOperation: A result cannot be successful and contain an error');
    }

    if (!isSuccess && !error) {
      throw new Error('InvalidOperation: A failing result needs to contain an error message');
    }

    this.isSuccess = isSuccess;
    this.isFailure = !isSuccess;
    this.error = error;
    this._value = value;

    Object.freeze(this);
  }

  public static ok<U>(value: U): Result<U> {
    return new Result<U>(true, undefined, value);
  }

  public static fail<U>(error: any): Result<U> {
    return new Result<U>(false, error);
  }

  public ok<U>(value: U): Result<U> {
    if (!this.isSuccess) {
      return Result.fail<U>(this.error as any);
    }
    return Result.ok<U>(value);
  }

  public fail<U>(error: any): Result<U> {
    if (this.isSuccess) {
      return Result.ok<U>(this.getValue() as any);
    }
    return Result.fail<U>(error);
  }

  public getValue(): T {
    if (!this.isSuccess) {
      return this.error as T;
    }

    return this._value as T;
  }
}
