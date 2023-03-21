export interface IEither<L, R> {
  isLeft(): boolean;
  isRight(): boolean;
  left(): L;
  right(): R;
}
