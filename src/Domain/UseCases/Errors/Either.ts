export interface IEither<L, R> {
  isLeft(): boolean;
  isRight(): boolean;
  left(): IEither<L, R> | L;
  right(): IEither<L, R> | R;
}
